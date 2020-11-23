import React, {Component} from 'react'
import PropTypes from 'prop-types'
import customTypes from './PropTypes'
import I18n from 'i18n!theme_editor'
import classnames from 'classnames'
import fonts from './Fonts'

export class ThemeEditorFontFamilyRow extends Component {
    static propTypes = {
        varDef: customTypes.fontFamily,
        onChange: PropTypes.func.isRequired,
        userInput: customTypes.userVariableInput,
        placeholder: PropTypes.string.isRequired,
        themeState: PropTypes.object,
        handleThemeStateChange: PropTypes.func
      }
    
      static defaultProps = {
        userInput: {},
        themeState: {},
        handleThemeStateChange() {}
      }
    
      state = {}
    
      showWarning = () => this.props.userInput.invalid && this.inputNotFocused()
    
      warningLabel = () => {
        if (this.showWarning()) {
          return (
            <span role="alert">
              <div className="ic-Form-message ic-Form-message--error" tabIndex="0">
                <div className="ic-Form-message__Layout">
                  <i className="icon-warning" role="presentation" />
                  {I18n.t("'%{chosenFontFamily}' is not a valid fontFamily.", {
                    chosenFontFamily: this.props.userInput.val
                  })}
                </div>
              </div>
            </span>
          )
        } else {
          // must return empty alert span so screenreaders
          // read the error when it is inserted
          return <span role="alert" />
        }
      }
    
      changedFontFamily(value) {
        // fail fast for no value
        if (!value) return null
    
        // set and read fontFamily values from a dom node to get only valid values
        const tempNode = document.createElement('span')
        tempNode.style.fontFamily = value
        const fontFamily = tempNode.style.fontFamily
    
        // reject invalid values
        if (!fontFamily) return null
    
        return fontFamily
      }

      inputChange = value => {
        const invalidFontFamily = !!value && (!this.changedFontFamily(value))
        this.props.onChange(value, invalidFontFamily)
        if (!invalidFontFamily) {
          this.props.handleThemeStateChange(this.props.varDef.variable_name, value)
        }
      }
    
      inputNotFocused = () => this.textInput && this.textInput !== document.activeElement
    
      updateIfMounted = () => {
        this.forceUpdate()
      }
    
      textFontFamilyInput = () => (
        <select         
            ref={c => (this.textInput = c)}
            id={`brand_config[variables][${this.props.varDef.variable_name}]`}
            className={classnames({
            'Theme__editor-fontFamily-block_input-text': true,
            'Theme__editor-fontFamily-block_input': true,
            'Theme__editor-fontFamily-block_input--has-error': this.props.userInput.invalid,
            'custom-select': true
            })}
            style={{fontFamily: this.props.placeholder}}
            aria-invalid={this.showWarning()}
            onChange={event => this.inputChange(event.target.value)}
            onBlur={this.updateIfMounted} >

            { fonts.map((font, key) => {
                if(font == this.props.placeholder){
                    return (<option 
                                key={key} 
                                value={font} 
                                style={{fontFamily: font}}
                                selected
                            >
                                {font}
                            </option>)
                }else{
                    return (<option 
                                key={key} 
                                value={font} 
                                style={{fontFamily: font}}
                            >
                                {font}
                            </option>)
                }
            })}

        </select>
      )
    
      render() {
        const fontFamilyInputValue = this.props.placeholder !== 'none' ? this.props.placeholder : null
        return (
          <section className="Theme__editor-accordion_element Theme__editor-fontFamily ic-Form-control border border-dark mt-1 mb-1 p-1 rounded">
            <div className="Theme__editor-form--fontFamily">
              <label
                htmlFor={`brand_config[variables][${this.props.varDef.variable_name}]`}
                className="Theme__editor-fontFamily_title h6"
              >
                {this.props.varDef.human_name}
              </label>
              <hr />
              <div className="Theme__editor-fontFamily-block border p-2">
                {this.textFontFamilyInput()}
                {this.warningLabel()}
                <p
                  className="Theme__editor-fontFamily-label Theme__editor-fontFamily-block_label-sample border text-center shadow"
                  style={{fontFamily: this.props.placeholder}}
                  /* this <p> and <input type=fontFamily> are here so if you click the 'sample',
                  it will pop up a fontFamily picker on browsers that support it */
                >
                    Text Example
                </p>
              </div>
            </div>
          </section>
        )
      }
}

export default ThemeEditorFontFamilyRow
