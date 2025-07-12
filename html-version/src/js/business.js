export function checkCompanySeatLimit() {
    const company = JSON.parse(localStorage.getItem("current_company"));
    const members = JSON.parse(localStorage.getItem("team_users") || "[]")
        .filter(u => u.companyId === company.id).length;

    const plan = company?.subscription?.plan || "free";
    const limits = { free: 20, pro: 25, enterprise: Infinity };

    if (members < limits[plan]) {
        alert(`Seat limit exceeded ${limits[plan]}. Please upgrade to add more members.`);
        // Optionally redirect to billing modal
        return false
    }
    return true
}

function companyHasRoom() {
   

    return members < limits[plan];
}




export function init(params) {
 
  requestAnimationFrame(() => {
  });

  //  action in html string will work like this
  return {
   companyHasRoom,
   checkCompanySeatLimit
  };
}
