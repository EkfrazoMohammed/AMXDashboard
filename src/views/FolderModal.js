import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";

const FolderModal = ({ isOpen, toggleModal, folderList, onSave }) => {
  const [selectedFolder, setSelectedFolder] = useState("");

  const handleSave = () => {
    onSave(selectedFolder);
    setSelectedFolder("");
  };

  return (
    <Modal isOpen={isOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Save KML File in Folder</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="folderSelect">Select Folder:</Label>
            <Input
              type="select"
              id="folderSelect"
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option value="">Select Folder</option>
              {folderList.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FolderModal;
