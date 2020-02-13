import React, { Component, PureComponent } from "react";
import { MDBBtn } from "mdbreact";
import ModalPopup from "./ModalPopup";
import showPopupNotification from "./common/ToasterNotification";

import "./NotesCategories.scss";

class NotesCategories extends PureComponent {
  addNotesCategory = () => {
    const { user, notesCategories, notesCategoryInputText } = this.props;
    if (notesCategoryInputText) {
      if (notesCategories.indexOf(notesCategoryInputText) === -1) {
        this.props.addNotesCategoryDB(user, notesCategoryInputText);
        this.props.setStoreVariable(
          "selectedNotesCategory",
          notesCategoryInputText
        );
        this.props.fetchTextsDB(user, notesCategoryInputText);
      } else {
        alert("Note category already present!");
      }
    } else {
      alert("Note category cannot be Empty!");
    }
    this.props.setStoreVariable("notesCategoryInputText", "");
    showPopupNotification(
      "Successfully Added!!! ",
      "notify-create",
    );
  };
  fetchNotesByCategory = category => {
    const { user } = this.props;
    this.props.setStoreVariable("selectedNotesCategory", category);
    this.props.fetchTextsDB(user, category);
  };
  deleteNotesCategory = (category) => {
    const { user } = this.props;
    this.props.setStoreVariable("selectedNotesCategory", category);
    this.props.fetchTextsDB(user, category);
    this.props.modalToggle("DELETE-CATEGORY");
  }
  render() {
    const { notesCategories, user, notesCategoryInputText, selectedNotesCategory } = this.props;
    return (
      <div className="notesCategories-container row no-gutters">
        <div className="col-12 notesCategories__heading">
          <h5>Notes Categories</h5>
        </div>
        <div className="col-12 notesCategories__list">
          <ul>
            {notesCategories.length > 0 &&
              notesCategories.map((category, index) => {
                const notesSelectedFlag = (category === selectedNotesCategory);
                return (
                  <>
                    <li key={index}>
                      <MDBBtn
                        outline={notesSelectedFlag ? false : true}
                        color={notesSelectedFlag ? "success" : ""} rounded onClick={() => {
                          this.fetchNotesByCategory(category);
                        }}>
                        {category}
                      </MDBBtn>
                      {category !== "Default" && (
                        <i
                          class="fa fa-window-close"
                          aria-hidden="true"
                          onClick={() => {
                            this.deleteNotesCategory(category)
                          }}
                        ></i>
                      )}
                    </li>
                
                  </>
                )
              })}
          </ul>
        </div>
        {this.props.expandInputBox && (
          <div className="col-12 notesCategories__inputBox">
            <input
              placeholder="Add notes category..."
              name="notesCategoryInputText"
              type="text"
              value={notesCategoryInputText}
              onChange={e =>
                this.props.setStoreVariable(e.target.name, e.target.value)
              }
            />
            <MDBBtn color="info" onClick={this.addNotesCategory}>ADD CATEGORY</MDBBtn>
          </div>
        )}
        <ModalPopup {...this.props} />
      </div>
    );
  }
}
export default NotesCategories;
