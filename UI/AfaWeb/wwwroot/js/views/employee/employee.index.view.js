'use strict';
class employeeIndexView {

    constructor() {
        this.searchModalId = 'searchEmployeeModal';
        this.createEmployeeModalId = 'createEmployeeModal';
        this.searchModalElementsIds = {
            name: 'searchInputName',
            rfc: 'searchInputRfc',
            stillWorking: 'searchSelectStatus'
        };

        this.searchModalButtonId = 'searchModalButton';
        this.actualizarButtonId = 'btnActualizar';
        this.createEmployeeButtonId = 'createEmployeeButton';
        this.saveNewEmployeeButtonId = 'saveNewEmployeeButton';
        this.searchModal = new bootstrap.Modal(this.getElement(this.searchModalId), {
            keyboard: false
        });

        this.createEmployeeModal = new bootstrap.Modal(this.getElement(this.createEmployeeModalId), {
            keyboard: false
        });

        this.createEmployeeModalControls = [
            { elementId: 'inputCreateEmployeeFirstName', property: 'firstName' },
            { elementId: 'inputCreateEmployeeMiddleName', property: 'middleName' },
            { elementId: 'inputCreateEmployeeLastName', property: 'lastName' },
            { elementId: 'inputCreateEmployeeAge', property: 'age', type: 'number' },
            { elementId: 'inputCreateEmployeeBirthDate', property: 'birthDate', type: 'date' },
            { elementId: 'inputCreateEmployeeRfc', property: 'rfc' },
            { elementId: 'inputCreateEmployeeAddress', property: 'address' },
            { elementId: 'inputCreateEmployeeEmail', property: 'email' },
            { elementId: 'inputCreateEmployeePhoneNumber', property: 'phoneNumber' },
            { elementId: 'inputCreateEmployeeDischarge', property: 'dischargeDate', type: 'date' },
            { elementId: 'inputCreateEmployeeLeavingDate', property: 'leavingDate', type: 'date' },
            { elementId: 'genderModalDropDownContainer', property: 'leavingDate', type: 'ddl' },
            { elementId: 'civilStatusModalDropDownContainer', property: 'leavingDate', type: 'ddl' },
            { elementId: 'PositionModalDropDownContainer', property: 'leavingDate', type: 'ddl' }
        ];

        this.searchModalElements = {
            name: this.getElement(this.searchModalElementsIds.name),
            rfc: this.getElement(this.searchModalElementsIds.rfc),
            stillWorking: this.getElement(this.searchModalElementsIds.stillWorking),
        };
        this.employeeApi = new employeeApi();
        this.genderApi = new genderApi();
        this.civilStatusApi = new civilStatusApi();
        this.positionApi = new positionApi();
        this.employeesKendoGrid = null;
        this.employeeToCreate = {};
        this.addListeners();
    }
    getElement(id) {
        return document.getElementById(id);
    }

    addListeners() {
        this.actualizarButton = this.getElement(this.actualizarButtonId);
        this.actualizarButton.addEventListener('click', () => this.initializeComponents());
        this.searchModalButton = this.getElement(this.searchModalButtonId);
        this.searchModalButton.addEventListener('click', () => this.searchFromModal());
        this.createEmployeeButton = this.getElement(this.createEmployeeButtonId);
        this.createEmployeeButton.addEventListener('click', () => this.addEmployee());
        this.saveNewEmployeeButton = this.getElement(this.saveNewEmployeeButtonId);
        this.saveNewEmployeeButton.addEventListener('click', () => this.tryCreateEmployee());
        this.addListenersAutomatically();
    }

    addListenersAutomatically() {
        for (let iInput = 0; iInput < this.createEmployeeModalControls.length; iInput++) {
            const inputElement = this.createEmployeeModalControls[iInput];
            var element = document.getElementById(inputElement.elementId);
            element.addEventListener('change', evt => {
                var primitiveValue = evt.target.value;
                var value = null;
                try {
                    if (element.type == 'ddl') {
                        var dropdownlist = $('#' + inputElement.elementId).data("kendoDropDownList");
                        value = dropdownlist.value();
                        console.log(value);
                    }
                    if (element.type == 'number') {
                        value = Number(primitiveValue);
                    }
                    else {
                        value = inputElement.type == 'date' ? (primitiveValue ? new Date(primitiveValue) : null) : primitiveValue;
                    }

                } catch (error) {

                }
                this.employeeToCreate[inputElement.property] = value;
            });
        }
    }

    tryCreateEmployee() {
        try {
            //await this.employeeApi.createEmployeesAsync(this.employeeToCreate);
            this.employeesKendoGrid.dataSource.add(this.employeeToCreate);
            this.employeesKendoGrid.saveChanges();
        } catch (error) {
            console.error(error);
        }
    }
    addEmployee() {
        this.employeeToCreate = {};
        this.createEmployeeModal.show();
        var newEmployee = {
            "employeeId": 0,
            "firstName": "Mixtle",
            "middleName": "Ricardo",
            "lastName": "Mercado",
            "age": 12,
            "birthDate": "2009-11-05T00:00:00",
            "rfc": "RIMM091105",
            "address": "Azaleas, 6",
            "email": "mixgamer@msn.com",
            "phoneNumber": "5527262524",
            "dischargeDate": "2022-03-01T00:00:00",
            "leavingDate": null,
            "genderId": 1,
            "civilStatusId": 1,
            "positionId": 2
        };
        this.dispatchEvents();
        console.log(this.employeeToCreate);
    }

    dispatchEvents() {
        this.createEmployeeModalControls.forEach(iE => {
            if (iE.type === 'ddl') {
                var dropdownlist = $('#' + iE.elementId).data("kendoDropDownList");
                dropdownlist.trigger("change");
            }
            else {
                var element = document.getElementById(iE.elementId);
                element.dispatchEvent(new Event('change'));
            }
        })
    }
    async initializeComponents() {
        this.genders = await this.genderApi.getGendersAsync();
        this.civilStatus = await this.civilStatusApi.getCivilStatusAsync();
        this.positions = await this.positionApi.getPositionsAsync();
        this.clearModalElementsValues();
        await this.buildTableInitialTable();
        this.initializeEmployeeModalControls();
    }

    initializeEmployeeModalControls() {
        var genders = this.genders;
        var civilStatus = this.civilStatus;
        var positions = this.positions;

        var kendoModalGenderDropdownSelector = '#genderModalDropDownContainer';
        var genderValueField = "genderId";
        this.initializeDropDownList(kendoModalGenderDropdownSelector, genderValueField, genders);

        var civilStatusModalDropDownContainerSelector = '#civilStatusModalDropDownContainer'
        var civilStatusValueField = 'civilStatusId';
        this.initializeDropDownList(civilStatusModalDropDownContainerSelector, civilStatusValueField, civilStatus);

        var positionsModalDropdownContainerSelector = '#PositionModalDropDownContainer'
        var positionValueField = 'positionId';
        this.initializeDropDownList(positionsModalDropdownContainerSelector, positionValueField, positions);

    }
    initializeDropDownList(selector, valueField, data, changeCallback) {
        $(selector).kendoDropDownList({
            autoBind: false,
            dataSource: data,
            dataTextField: "name",
            dataValueField: valueField,
            change: evt => {
                var selectedItem = evt.sender.dataItem() ?? {};
                this.employeeToCreate[valueField] = selectedItem[valueField];
                console.log(this.employeeToCreate);
            }
        });
        this.setKendoDropDownListDefaultValue(selector, data, valueField);
    }

    setKendoDropDownListDefaultValue(selector, data, prop) {
        var dropdownlist = $(selector).data("kendoDropDownList");
        dropdownlist.value(data[0][prop]);
        dropdownlist.trigger("change");
    }

    getDefaultTransport() {
        var createAsync = async (op) => {
            var employee = op.data.models[0];
            var created = await this.employeeApi.createEmployeesAsync(employee);
            op.success(created);
        };
        return {
            read: async (op) => {
                var data = await this.employeeApi.getEmployeesAsync();
                op.success(data);
            },
            update: async (op) => {
                var epmloyeeToUpdate = op.data.models[0];
                if (!epmloyeeToUpdate.employeeId) {
                    createAsync(op);
                    return;
                }
                await this.employeeApi.updateEmployeeAsync(epmloyeeToUpdate);
                op.success(epmloyeeToUpdate);
            },
            destroy: async (op) => {
                var employeeId = op.data.models[0].employeeId;
                await this.employeeApi.deleteEmployeeAsync(employeeId);
                op.success();
            },
            create: createAsync,
        };
    }

    async buildTableInitialTable() {
        await this.buildTable(this.getDefaultTransport());
    }
    async buildTable(transport) {
        var gridSelector = "#divEmployeesGridContainer";
        removeChildsBeforeBuildGrid(gridSelector);
        var dataSource = new kendo.data.DataSource({
            transport: transport,
            pageSize: 20,
            batch: true,
            schema: {
                model: {
                    fields: {
                        id: { name: 'employeeId', type: 'number' },
                        employeeId: { type: "number" },
                        firstName: { type: "string" },
                        middleName: { type: "string" },
                        lastName: { type: "string" },
                        position: { type: "object" },
                        age: { type: 'number', editable: false },
                        birthDate: { type: 'date' },
                        dischargeDate: { type: 'date' },
                    }
                }
            }
        });

        $(gridSelector).kendoGrid({
            dataSource: dataSource,
            height: 550,
            //batch: true,
            toolbar: ["create"], //[{ name: "create", text: "Crear" }],
            columns: [
                { field: "fullName", title: "Name", template: `<span>#=data.firstName# #=data.middleName# #=data.lastName#</span>` },
                { field: "email", title: "Email" },
                { field: "position?.name", title: "Position" },
                { field: "rfc", title: "RFC" },
                { field: "dischargeDate", title: "Discharge", format: "{0:dd/MMMM/yyyy}" },
                {
                    command: [{ name: "edit", text: 'Editar' }, { name: "destroy", text: 'Eliminar' }],
                    title: "&nbsp;", width: "250px"
                },
            ],
            editable: {
                mode: "popup",
                template: kendo.template($("#editableTemplate").html())
            },

            edit: (e) => {
                var model = e.model;
                var civilStatus = this.civilStatus;
                $("#civilStatusDropDownContainer").kendoDropDownList({
                    autoBind: false,
                    dataSource: civilStatus,
                    dataTextField: "name",
                    dataValueField: "civilStatusId",
                    template: '<span class="k-state-default" data-bind="value:civilStatusId">#: data.name #</span>',
                    change: function (evt) {
                        try {
                            var genderSelected = evt.sender.dataItem() ?? {};
                            console.log(genderSelected);
                            model.set('civilStatusId', genderSelected.civilStatusId);
                            model.set('civilStatus', genderSelected);
                        } catch (error) {
                            console.error(error);
                        }
                    }
                });
                if (model.civilStatusId) {
                    var dropdownlist = $("#civilStatusDropDownContainer").data("kendoDropDownList");
                    dropdownlist.value(model.civilStatusId);
                    dropdownlist.refresh();
                }

            },
            crete: evt => {
                console.log(evt);
            },
            cancel: (cancelEvent) => {
                this.employeesKendoGrid.dataSource.cancelChanges();

            },
        });
        this.employeesKendoGrid = $(gridSelector).data('kendoGrid');
        // $(gridSelector).on("click", ".customEdit", function(){
        //     var row = $(this).closest("tr");
        //     console.log(row);
        //     $(gridSelector).data("kendoGrid").editRow(row);
        //   });
    }


    async searchFromModal() {
        var transportData = this.getDefaultTransport();
        transportData.read = (op) => this.getDataFromSearchCriteria(op);
        await this.buildTable(transportData);
    }

    async getDataFromSearchCriteria(op) {
        var criteria = {
            name: this.searchModalElements.name.value,
            rfc: this.searchModalElements.rfc.value,
            stillWorking: this.searchModalElements.stillWorking.value === "true"
        };
        var employees = await this.employeeApi.searchByCriteria(criteria);
        op.success(employees);
    }

    clearModalElementsValues() {
        this.searchModalElements.name.value = "";
        this.searchModalElements.rfc.value = "";
        this.searchModalElements.stillWorking.value = "true";
    }
};

$(document).ready(async () => {
    var employeeIndexViewInstance = new employeeIndexView();
    await employeeIndexViewInstance.initializeComponents();
    //var data = await employee.getEmployeesAsync();
    //buildTable();
});