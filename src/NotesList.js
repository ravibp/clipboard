import React from "react";
import FilterResults from "react-filter-search";
import ContentEditable from "react-contenteditable";
import Moment from "react-moment";
import { ReactComponent as IconClipboard } from "./assets/svg/IconClipboard.svg";
import showPopupNotification from "./common/ToasterNotification";
const FontAwesome = require("react-fontawesome");

class NotesList extends React.Component {
    enableTextEdit = textObj => {
        document.getElementById(textObj.id).contentEditable = true;
        document.getElementById(textObj.id).focus();
        this.props.setTextDetails(textObj, null);
        this.updateFlag = false;
    };
    showEditCopyBtn = text => {
        return (
            <div className="icons-container">
                <span className="edit-icon">
                    <FontAwesome
                        onClick={this.enableTextEdit.bind(this, text)}
                        className="super-crazy-colors"
                        name="edit"
                        size="2x"
                        style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
                    />
                </span>
                <span className="clipboard-icon">
                    <IconClipboard onClick={this.readText.bind(this, text.id)} />
                </span>
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
        window
            .getSelection()
            .selectAllChildren(document.getElementById(textID));
        document.execCommand("copy");

        // de-select current selection
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.selection) {
            document.selection.empty();
        }
        showPopupNotification("Successfully Copied!!! ", "notify-create");
    };
    render() {
        const {
            texts,
            searchText
        } = this.props;
        return (
            <>
                {texts && texts.length === 0 && <p>Your Clipboard is empty!</p>}
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
                                            <li key={index + 1}>
                                                <span className="text-index">{index + 1}.</span>
                                                <span className="delete-icon">
                                                    <FontAwesome
                                                        onClick={() => {
                                                            this.props.setTextDetails(text, null);
                                                            this.props.modalToggle("DELETE");
                                                        }}
                                                        className="super-crazy-colors"
                                                        name="remove"
                                                        size="2x"
                                                        style={{
                                                            textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)"
                                                        }}
                                                    />
                                                </span>
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
                                                        html={text.textValue} // innerHTML of the editable div
                                                        disabled={true} // use true to disable editing
                                                        onChange={this.updateText.bind(this, text.id)} // handle innerHTML change
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
            </>
        )
    }
}

export default NotesList;