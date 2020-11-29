import React, {Component} from 'react'
import PropTypes from 'prop-types'
import customTypes from './PropTypes'
import I18n from 'i18n!theme_editor'
import classnames from 'classnames'

export class ThemeEditorFontSizeRow extends Component {
    static propTypes = {
        varDef: customTypes.fontSize,
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
                  {I18n.t("'%{chosenFontSize}' is not a valid fontSize.", {
                    chosenFontSize: this.props.userInput.val
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
    
      changedFontSize(value) {
        let val = value.slice(0, (value.length - 2))

        // fail fast for no value
        if (!value) return null
    
        // set and read fontSize values from a dom node to get only valid values
        const tempNode = document.createElement('span')
        tempNode.style.fontSize = value
        const fontSize = tempNode.style.fontSize
    
        // reject invalid values
        if (!fontSize) return null
    
        return fontSize
      }

      invalidNumber(sizeValue) {
        console.log(sizeValue);
        let val = sizeValue.slice(0, (sizeValue.length - 2))
        console.log(val);
        console.log(+val != NaN);
        console.log((+val).toString().length == val.length);
        console.log((+val > 4 && +val < 73));
        console.log((+val).toString().length == val.length && +val > 4 && +val < 73);

        return (+val == NaN)  ? false : ((+val).toString().length != val.length && +val < 5 && +val > 72)
      }

      inputChange = value => {
        let val;
        if (value.includes("px")) {
            val = value
        }else{
            val = `${value}px`;
        }

        const invalidFontSize = !!val && (!this.changedFontSize(val)) || this.invalidNumber(val)
        this.props.onChange(val, invalidFontSize)
        if (!invalidFontSize) {
          this.props.handleThemeStateChange(this.props.varDef.variable_name, val)
        }
      }
    
      inputNotFocused = () => this.textInput && this.textInput !== document.activeElement
    
      updateIfMounted = () => {
        this.forceUpdate()
      }
    
      textFontSizeInput = () => (
        <span>
          <input
            ref={c => (this.textInput = c)}
            type="text"
            name="fontSize"
            id={`brand_config[variables][${this.props.varDef.variable_name}]`}
            className={classnames({
              'Theme__editor-fontSize-block_input-text': true,
              'Theme__editor-fontSize-block_input': true,
              'Theme__editor-fontSize-block_input--has-error': this.props.userInput.invalid,
              'form-control': true
            })}
            placeholder={this.props.placeholder}
            value={this.props.themeState[this.props.varDef.variable_name]}
            aria-invalid={this.showWarning()}
            onChange={event => this.inputChange(event.target.value)}
            onBlur={this.updateIfMounted}
          />
        </span>
      )
    
      render() {
        const fontSizeInputValue = this.props.placeholder !== 'none' ? this.props.placeholder : null
        return (
        <section className="Theme__editor-accordion_element Theme__editor-fontFamily ic-Form-control border border-dark mt-1 mb-1 p-1 rounded">
            <div className="Theme__editor-form--fontSize">
              <label
                htmlFor={`brand_config[variables][${this.props.varDef.variable_name}]`}
                className="Theme__editor-fontSize_title h6"
              >
                {this.props.varDef.human_name}
              </label>
              <hr />
              <div className="Theme__editor-fontSize-block border p-2">
                {this.textFontSizeInput()}
                {this.warningLabel()}
                <p
                  className="Theme__editor-fontSize-label Theme__editor-fontSize-block_label-sample border text-center shadow"
                  style={{fontSize: this.props.placeholder}}
                  /* this <p> and <input type=fontSize> are here so if you click the 'sample',
                  it will pop up a fontSize picker on browsers that support it */
                >
                    Text Example
                </p>
              </div>
            </div>
          </section>
        )
      }
}

export default ThemeEditorFontSizeRow
