  function checkCompanySeatLimit() {
            const company = JSON.parse(localStorage.getItem("current_company"));
            const users = JSON.parse(localStorage.getItem("team_users") || "[]")
                .filter(u => u.companyId === company.id);

            if (users.length > 20) {
                alert("Seat limit exceeded (20 free). Please upgrade to add more members.");
                // Optionally redirect to billing modal
                return false
            }
            return true
        }