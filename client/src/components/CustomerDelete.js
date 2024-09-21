import axios from "axios";

const CustomerDelete = ({ id, stateRefresh }) => {
  function deleteCustomer(id) {
    const url = "/api/customers/" + id;
    axios.delete(url);
    stateRefresh();
  }

  return (
    <button
      onClick={(e) => {
        deleteCustomer(id);
      }}
    >
      삭제
    </button>
  );
};

export default CustomerDelete;
