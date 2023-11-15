import { Card, Row } from "antd";
import React from "react";
import Button from "../Button";

function Cards(props) {
  return (
    <div>
      <Row className="flex justify-between items-center w-[95%] m-auto my-8 flex-wrap gap-4">
        <Card
          className="shadow-2xl min-w-[450px] !p-1 m-0 font-sans border rounded-lg "
          title="Current Balance"
        >
          <p className="m-0">₹0</p>
          <Button text="Reset Balance " color="blue" />
        </Card>
        <Card
          className="shadow-2xl min-w-[450px] !p-1 m-0 font-sans border rounded-lg "
          title="Total Income"
        >
          <p className="m-0">₹0</p>
          <Button
            text="Add Income "
            color="blue"
            onClick={() => props.showIncomeModals()}
          />
        </Card>
        <Card
          className="shadow-2xl min-w-[450px] !p-1 m-0 font-sans border rounded-lg "
          title="Total Expenses"
        >
          <p className="m-0">₹0</p>
          <Button
            text="Add Expense "
            color="blue"
            onClick={() => props.showExpenseModals()}
          />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
