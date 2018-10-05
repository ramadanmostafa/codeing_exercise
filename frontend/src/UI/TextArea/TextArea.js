import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';



class TextArea extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    richValue: RichTextEditor.createValueFromString(this.props.value, 'html'),
    htmlValue: this.props.value,
  };

  componentWillReceiveProps (newProps) {
    if (newProps.value != this.state.htmlValue) {
      this.setState({
        richValue: RichTextEditor.createValueFromString(newProps.value, 'html'),
        htmlValue: newProps.value,
      });
    }
  }

  onChange = (richValue) => {
    this.setState({richValue, htmlValue: richValue.toString('html')}, () => {
      this.props.onChange(this.state.htmlValue);
    });
  };

  render () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <RichTextEditor
          value={this.state.richValue}
          onChange={this.onChange}
        /> <br /> <br />
      </div>
    );
  }
}

export default TextArea;