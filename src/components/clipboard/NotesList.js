import React from "react";
import FilterResults from "react-filter-search";
import ContentEditable from "react-contenteditable";
import Moment from "react-moment";
import "components/clipboard/NotesList.scss";
import FontAwesome from "react-fontawesome";
import showPopupNotification, {
  highlightOperationOnText
} from "common/ToasterNotification";

class NotesList extends React.Component {
  constructor(props) {
    super(props);
    this.updateFlag = false;
    this.newTextObj = "";
  }
  enableTextEdit = textObj => {
    document.getElementById(textObj.id).contentEditable = true;
    document.getElementById(textObj.id).focus();
    this.props.setTextDetails(textObj, null);
    this.updateFlag = false;
  };
  showEditCopyBtn = text => {
    return (
      <div className="icons-container">
        <FontAwesome
          onClick={this.enableTextEdit.bind(this, text)}
          className="super-crazy-colors edit-icon"
          name="edit"
          style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
        />
        <FontAwesome
          onClick={this.readText.bind(this, text.id)}
          className="super-crazy-colors clipboard-icon"
          name="clipboard"
          style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
        />
      </div>
    );
  };
  handleContentBlur = textID => {
    document.getElementById(textID).contentEditable = false;
    if (this.updateFlag === true) {
      this.props.setTextDetails(this.props.textObj, this.newTextObj);
      this.props.modalToggle("UPDATE");
    }
  };
  updateText = textID => {
    const textObj = {
      id: textID,
      textValue: document.getElementById(textID).innerHTML,
      dateStamp: new Date().toLocaleString().split(",")
    };
    this.newTextObj = textObj;
    this.props.renderOldText(textObj);
    this.updateFlag = true;
  };
  readText = textID => {
    window.getSelection().selectAllChildren(document.getElementById(textID));
    document.execCommand("copy");
    // de-select current selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else if (document.selection) {
      document.selection.empty();
    }
    highlightOperationOnText(textID, "notify-create");
    showPopupNotification("Successfully Copied!!! ", "notify-create");
  };
  render() {
    const { texts, searchText } = this.props;
    return (
      <>
        {texts && texts.length === 0 && <p>Your Clipboard is empty!</p>}
        {texts && (
          <FilterResults
            value={searchText}
            data={texts}
            renderResults={texts => {
              texts.reverse();
              return (
                <>
                  {texts && texts.length === 0 && searchText && (
                    <p className="no-search-results">No results found!</p>
                  )}
                  <ul>
                    {texts.map((text, index) => {
                      return (
                        <li key={text.id}>
                          <span className="text-index">{index + 1}.</span>
                          <FontAwesome
                            onClick={() => {
                              this.props.setTextDetails(text, null);
                              this.props.modalToggle("DELETE");
                            }}
                            className="super-crazy-colors delete-icon"
                            name="remove"
                            style={{
                              textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)"
                            }}
                          />
                          {window.innerWidth > 767 &&
                            this.showEditCopyBtn(text)}
                          <div className="contentEditable-wrapper">
                            <ContentEditable
                              name="inputText"
                              onDoubleClick={this.enableTextEdit.bind(
                                this,
                                text
                              )}
                              contentEditable={false}
                              id={text.id}
                              className="text-value"
                              html={text.textValue}
                              disabled={true}
                              onChange={this.updateText.bind(this, text.id)}
                              onBlur={this.handleContentBlur.bind(
                                this,
                                text.id
                              )}
                              tagName="pre" // Use a custom HTML tag (uses a div by default)
                            />
                          </div>
                          {window.innerWidth <= 767 &&
                            this.showEditCopyBtn(text)}
                          <Moment
                            format="DD MMM YYYY, HH:mm"
                            className="dateStamp"
                            date={new Date()}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </>
              );
            }}
          />
        )}
      </>
    );
  }
}

export default NotesList;
