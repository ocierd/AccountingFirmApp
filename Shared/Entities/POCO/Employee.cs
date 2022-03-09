
namespace AFA.Shared.Entities.POCO
{
    public class Employee
    {

        public int EmployeeId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public byte Age { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Rfc { get; set; }

        public string? Address { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public DateTime DischargeDate { get; set; }
        public DateTime? LeavingDate { get; set; }

        #region Gender
        public byte GenderId { get; set; }

        public Gender? Gender { get; set; }

        #endregion


        #region CivilStatus
        public byte CivilStatusId { get; set; }
        public CivilStatus? CivilStatus { get; set; }

        #endregion

        #region Postition
        public byte PositionId { get; set; }
        public Position? Position { get; set; }
        #endregion

    }
}