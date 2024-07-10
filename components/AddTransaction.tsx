"use client";

import { useRef } from "react";

import addTransaction from "@/actions/addTransaction";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Transaction added.");
    formRef.current?.reset();
  };

  return (
    <>
      <h3>Add Transaction</h3>
      <form action={clientAction} ref={formRef}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            id="text"
            name="text"
            placeholder="Enter text..."
          ></input>
        </div>
        <div className="form-control">
          <label htmlFor="amount">
            Amount <br /> {`{negative - expense, positive - incoming}`}
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Enter amount..."
            step={`0.0.1`}
          />
        </div>
        <button className="btn">Add Transaction</button>
      </form>
    </>
  );
};

export default AddTransaction;
