import React, { useState, useEffect } from "react";
import NavbarAdmin from "../../components/common/navbar/navbarAdmin";
import TableComp from "../../components/common/table/table";
import ModalComp from "../../components/common/modal/modal";
import ConfirmModal from "../../components/common/modal/confirm-modal";
import ModalEdit from "../../components/common/modal/edit-modal";
import { Empty, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { listAllAccounts, deleteAccount,listAccountDetail } from "../../actions/accountAction";
import AccountRegisterForm from "../../components/common/form/account-register-form";

import AccountEditForm from "../../components/common/form/account-edit-form";

const Account = () => {
  const dispatch = useDispatch();
  const accountSearchTitle = "Account";
  const accountEditTitle = "Account Edit";
  const accountTitle = "Account Register";
  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [accountID, setAccountID] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const AccountList = useSelector((state) => state.accountList?.accounts);
  const AccountDetail = useSelector((state) => state.accountDetail?.account);
  console.log(AccountDetail)
  let totalAccounts ;
  try{
    totalAccounts = AccountList.length;
  }catch(error){
    totalAccounts = 0;
  }

  const columns = [
    {
      title: "Full name",
      dataIndex: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
    },
    {
      title: "Create Date",
      dataIndex: "createdDate",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => (role === 0 ? "Admin" : "User"),
    },
  ];

  //   Toggle Modal
  const showUpModalNew = async () => {
    setModalNew(!modalNew);
  };

  const showUpModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const showUpModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const loadingPage = () => {
    setIsLoading(true);
    setRole(null);
    setAccountID(null);
  };
  //  Logic Code

  useEffect(() => {
    if (AccountList) {
      dispatch(listAllAccounts());
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        dispatch(listAllAccounts());

        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  
  const onReset = () =>{
    setModalNew(false);
    setModalDelete(false);
    setModalEdit(false);
    setAccountID(null);
    setRole(null);
    setIsLoading(true);
  }

  const updateAccountID = (id) => {
    setAccountID(id);
    dispatch(listAccountDetail(id));
  };

  const updateRole = (role) => {
    setRole(role);
  };

  const deleteAccountByID = (id) => {
    dispatch(deleteAccount(id));
    setIsLoading(true);
    setModalDelete(false);
    setAccountID(null);
    setRole(null);
  }

  return (
    <>
        <NavbarAdmin
        searchTitle={accountSearchTitle}
        toggleNew={showUpModalNew}
        toggleEdit={showUpModalEdit}
        toggleDelete={showUpModalDelete}
        onReset={onReset}
        activeItem={accountID}
        activeRole={role}
      />

      {/* Modal New */}
      <ModalComp
        title={accountTitle}
        isModal={modalNew}
        toggleNew={showUpModalNew}
        form={<AccountRegisterForm toggleNew={showUpModalNew} onLoading={loadingPage} />}
      />

      {/* Delete Account */}
      <ConfirmModal isModal={modalDelete} toggleModal={showUpModalDelete} onDelete={() => deleteAccountByID(accountID)} />

      {/* Edit Account */}
      

      <ModalEdit title={accountEditTitle} isModal={modalEdit} toggleEdit={showUpModalEdit} form={<AccountEditForm isModal={modalEdit} toggleEdit={showUpModalEdit} onLoading={loadingPage} data={AccountDetail} id={accountID} />}/>

      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Spin size="large" />
          </div>
        ) : AccountList ? (
          <TableComp
            data={AccountList?.map((item, index) => ({
              ...item,
              key: `account-${index}`,
            }))}
            columns={columns}
            selectedRow={updateAccountID}
            selectedAccount={updateRole}
            totalItem={totalAccounts}
          />
        ) : (<Empty/>)}
      </div>
    </>
  );
};

export default Account;
