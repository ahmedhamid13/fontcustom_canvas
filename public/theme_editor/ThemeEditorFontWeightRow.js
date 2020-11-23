import React, {Component} from 'react'
import PropTypes from 'prop-types'
import customTypes from './PropTypes'
import I18n from 'i18n!theme_editor'
import classnames from 'classnames'

export class ThemeEditorFontWeightRow extends Component {
    static propTypes = {
        varDef: customTypes.fontWeight,
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
                  {I18n.t("'%{chosenFontWeight}' is not a valid fontWeight.", {
                    chosenFontWeight: this.props.userInput.val
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
    
      changedFontWeight(value) {
        // fail fast for no value
        if (!value) return null
    
        // set and read fontWeight values from a dom node to get only valid values
        const tempNode = document.createElement('span')
        tempNode.style.fontWeight = value
        const fontWeight = tempNode.style.fontWeight
    
        // reject invalid values
        if (!fontWeight) return null
    
        return fontWeight
      }

      inputChange = value => {
        const invalidFontWeight = !!value && (!this.changedFontWeight(value))
        this.props.onChange(value, invalidFontWeight)
        if (!invalidFontWeight) {
          this.props.handleThemeStateChange(this.props.varDef.variable_name, value)
        }
      }
    
      inputNotFocused = () => this.textInput && this.textInput !== document.activeElement
    
      updateIfMounted = () => {
        this.forceUpdate()
      }
    
      textFontWeightInput = () => (
        <span>
                    <input
            ref={c => (this.textInput = c)}
            type="radio"
            name="fontWeight"
            id={`brand_config[variables][${this.props.varDef.variable_name}]`}
            className={classnames({
              'Theme__editor-fontWeight-block_input-text': true,
              'Theme__editor-fontWeight-block_input': true,
              'Theme__editor-fontWeight-block_input--has-error': this.props.userInput.invalid
            })}
            placeholder={this.props.placeholder}
            value="lighter"
            aria-invalid={this.showWarning()}
            onChange={event => this.inputChange(event.target.value)}
            onBlur={this.updateIfMounted}
          />Lighter<br />
          <input
            ref={c => (this.textInput = c)}
            type="radio"
            name="fontWeight"
            id={`brand_config[variables][${this.props.varDef.variable_name}]`}
            className={classnames({
              'Theme__editor-fontWeight-block_input-text': true,
              'Theme__editor-fontWeight-block_input': true,
              'Theme__editor-fontWeight-block_input--has-error': this.props.userInput.invalid
            })}
            placeholder={this.props.placeholder}
            value="normal"
            aria-invalid={this.showWarning()}
            onChange={event => this.inputChange(event.target.value)}
            onBlur={this.updateIfMounted}
          />Normal<br />
        <input
            ref={c => (this.textInput = c)}
            type="radio"
            name="fontWeight"
            id={`brand_config[variables][${this.props.varDef.variable_name}]`}
            className={classnames({
              'Theme__editor-fontWeight-block_input-text': true,
              'Theme__editor-fontWeight-block_input': true,
              'Theme__editor-fontWeight-block_input--has-error': this.props.userInput.invalid
            })}
            placeholder={this.props.placeholder}
            value="bold"
            aria-invalid={this.showWarning()}
            onChange={event => this.inputChange(event.target.value)}
            onBlur={this.updateIfMounted}
          />Bold<br />
                    <input
            ref={c => (this.textInput = c)}
            type="radio"
            name="fontWeight"
            id={`brand_config[variables][${this.props.varDef.variable_name}]`}
            className={classnames({
              'Theme__editor-fontWeight-block_input-text': true,
              'Theme__editor-fontWeight-block_input': true,
              'Theme__editor-fontWeight-block_input--has-error': this.props.userInput.invalid
            })}
            placeholder={this.props.placeholder}
            value="bolder"
            aria-invalid={this.showWarning()}
            onChange={event => this.inputChange(event.target.value)}
            onBlur={this.updateIfMounted}
          />Bolder
        </span>
      )
    
      render() {
        const fontWeightInputValue = this.props.placeholder !== 'none' ? this.props.placeholder : null
        return (
          <section className="Theme__editor-accordion_element Theme__editor-fontWeight ic-Form-control border border-dark mt-1 mb-1 p-1 rounded">
            <div className="Theme__editor-form--fontWeight">
              <label
                htmlFor={`brand_config[variables][${this.props.varDef.variable_name}]`}
                className="Theme__editor-fontWeight_title h6"
              >
                {this.props.varDef.human_name}
              </label>
              <hr />
              <div className="Theme__editor-fontWeight-block border p-2">
                {this.textFontWeightInput()}
                {this.warningLabel()}
                <p
                  className="Theme__editor-fontWeight-label Theme__editor-fontWeight-block_label-sample border text-center shadow"
                  style={{fontWeight: this.props.placeholder}}
                  /* this <p> and <input type=fontWeight> are here so if you click the 'sample',
                  it will pop up a fontWeight picker on browsers that support it */
                >
                    Text Example
                </p>
              </div>
            </div>
          </section>
        )
      }
}

export default ThemeEditorFontWeightRow
