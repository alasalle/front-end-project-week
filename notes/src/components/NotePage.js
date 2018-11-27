import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchNote, fetchNotes, deleteNote } from "../actions/actions";

import "../styles/App.css";
import "../styles/NotePage.css";
import "../styles/Sidebar.css";

class NotePage extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      deleted: false
    };
  }

  componentDidMount() {
    this.props.fetchNote(this.props.match.params.id);
  }

  deleteHandler = id => {
    this.props.deleteNote(id).then(() => this.props.fetchNotes());
    this.setState({ deleted: true });
  };

  modalHandler = () => {
    this.state.modal
      ? this.setState({ modal: false })
      : this.setState({ modal: true });
  };

  render() {
    let id = this.props.match.params.id;
    return this.state.deleted ? (
      <Redirect to="/" />
    ) : this.state.modal ? (
      <>
        <div className="modalWrapper">
          <div className="modal">
            <p>Are you sure you want to delete this?</p>
            <div className="modalButtonBox">
              <div
                className="first modalButton"
                onClick={() => {
                  this.modalHandler();
                  this.deleteHandler(id);
                }}
              >
                Delete
              </div>
              <div
                className="second modalButton"
                onClick={() => this.modalHandler()}
              >
                No
              </div>
            </div>
          </div>
        </div>

        <div className="modalBackground" />
        <div className="componentContainer">
          <div className="spanButtonsContainer">
            <a href={`/note/${id}/edit`}>edit</a>
            <span>delete</span>
          </div>
          <h2>{this.props.note.title}</h2>
          <p className="noteText">{this.props.note.textBody}</p>
          {this.props.tags
            .filter(tag => tag.id === this.props.note._id)
            .map(tag => (
              <span key={tag.date}>{`#${tag.tagText},`}</span>
            ))}
        </div>
      </>
    ) : (
      <div className="componentContainer">
        <div className="spanButtonsContainer">
          <a href={`/note/${id}/edit`}>edit</a>
          <span onClick={() => this.modalHandler()}>delete</span>
        </div>
        <h2>{this.props.note.title}</h2>
        <p className="noteText">{this.props.note.textBody}</p>
        {this.props.tags
          .filter(tag => tag.id === this.props.note._id)
          .map(tag => (
            <span key={tag.date}>{`#${tag.tagText},`}</span>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    note: state.note,
    tags: state.tags
  };
};

export default connect(
  mapStateToProps,
  { fetchNote, fetchNotes, deleteNote }
)(NotePage);
