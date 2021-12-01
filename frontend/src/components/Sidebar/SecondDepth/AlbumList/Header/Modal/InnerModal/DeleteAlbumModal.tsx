import Modal from "@components/Modal";
import DeleteModal from "@src/components/Modal/DeleteModal";

const DeleteAlbumModal = () => {
  return (
    <Modal>
      <DeleteModal type="album"></DeleteModal>
    </Modal>
  );
};

export default DeleteAlbumModal;
