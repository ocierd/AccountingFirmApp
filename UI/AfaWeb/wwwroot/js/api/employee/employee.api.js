var employeeApi = class {
    constructor() {
        this.apiControllerUrl = `/Employee`;
    }


    async getEmployeesAsync() {
        var urlGetEmployeees = `${this.apiControllerUrl}/GetEmployees`;
        return await xhr.getAsync(urlGetEmployeees);
    }


    async updateEmployeeAsync(epmloyeeToUpdate) {
        var updateEmployeeAsyncUrl = `${this.apiControllerUrl}/UpdateEmployee`;
        await xhr.putAsync(updateEmployeeAsyncUrl, epmloyeeToUpdate);
    }
}