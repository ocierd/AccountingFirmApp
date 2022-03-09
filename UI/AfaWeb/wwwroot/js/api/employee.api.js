var employeeApi = class {
    constructor() {
        this.apiControllerUrl = `/Employee`;
    }


    async searchByCriteria(criteria) {
        var updateEmployeeAsyncUrl = `${this.apiControllerUrl}/SearchByCriteria`;
        return await xhr.postAsync(updateEmployeeAsyncUrl, criteria);
    }

    async createEmployeesAsync(employee) {
        var createEmployeeAsyncUrl = `${this.apiControllerUrl}/CreateEmployee`;
        return await xhr.postAsync(createEmployeeAsyncUrl, employee);
    }

    async getEmployeesAsync() {
        var urlGetEmployeees = `${this.apiControllerUrl}/GetEmployees`;
        return await xhr.getAsync(urlGetEmployeees);
    }


    async updateEmployeeAsync(epmloyeeToUpdate) {
        var updateEmployeeAsyncUrl = `${this.apiControllerUrl}/UpdateEmployee`;
        await xhr.putAsync(updateEmployeeAsyncUrl, epmloyeeToUpdate);
    }


    async deleteEmployeeAsync(employeeId) {
        var deleteEmployeeAsyncUrl = `${this.apiControllerUrl}/DeleteEmployee?employeeId=${employeeId}`;
        await xhr.deleteAsync(deleteEmployeeAsyncUrl);
    }


}