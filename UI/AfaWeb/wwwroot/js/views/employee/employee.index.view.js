'use strict';



var employee = new employeeApi();


$(document).ready(async () => {
    var data = await employee.getEmployeesAsync();
    console.log('El documento ha sido cargado');
    buildTable();
});


function buildTable() {
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: async function (op) {
                var data = await employee.getEmployeesAsync();
                op.success(data);
            },
            update: async function (op) {
                console.log(op);
                var epmloyeeToUpdate = op.data.models[0];
                var updatedEmployee = await employee.updateEmployeeAsync(epmloyeeToUpdate);
                console.log(updatedEmployee);
                op.success(epmloyeeToUpdate);
            },
            // destroy: {
            //     url: xhr.apiUrl + "/Products/Destroy",
            //     dataType: "jsonp"
            // },
            create: async function (op, data) {
                console.log(data);
                var data = await xhr.getAsync('/Employee');
                op.success(data)
            },
            cancel: cancelEvt => {
                console.log(cancelEvt);
            }
        },
        batch: true,
        pageSize: 20,
        schema: {
            model: {
                fields: {
                    id: { name: 'employeeId', type: 'number' },
                    employeeId: { type: "number" },
                    firstName: { type: "string" },
                    middleName: { type: "string" },
                    lastName: { type: "string" },
                    age: { type: 'number', editable: false }
                }
            }
        }
    });

    var gridSelector = "#table";

    var kendoGriddd = $(gridSelector).kendoGrid({
        dataSource: dataSource,
        height: 550,
        batch: true,
        toolbar: [{ name: "create", text: "Crear" }],
        scrollable: true,
        sortable: true,
        filterable: true,
        pageable: {
            input: true,
            numeric: false
        },
        columns: [
            //{ field: "employeeId", title: "Id", },
            { field: "firstName", title: "Name", },
            { field: "middleName", title: "Middle name", },
            { field: "lastName", title: "Last name" },
            { field: "age", title: "Age", format: "{0:n0}" },
            {
                command: [
                    {
                        name: "edit",
                        text: 'actualizar'
                    }
                ], title: "&nbsp;", width: "250px"
            },
        ],
        editable: "popup",
        cancel: function (cancelEvent) {
            $(gridSelector).data('kendoGrid').dataSource.cancelChanges();
        },
    });
}