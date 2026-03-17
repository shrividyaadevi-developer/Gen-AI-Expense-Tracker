import React from "react";

function SidebarCards({totalExpense}) {

  return (
    <div style={{display:"flex",gap:"20px"}}>

      <div style={{border:"1px solid gray",padding:"10px"}}>
        <h3>Total Expense</h3>
        <p>₹{totalExpense}</p>
      </div>

      <div style={{border:"1px solid gray",padding:"10px"}}>
        <h3>AI Summary</h3>
      </div>

    </div>
  );
}

export default SidebarCards;