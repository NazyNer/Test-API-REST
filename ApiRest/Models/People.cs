using System.ComponentModel.DataAnnotations;

namespace ApiRest.Models
{

    public class Person{

        [Key]
        public int ID {get; set; }

        public string? nombre {get; set;}
        public string? apellido {get; set;}
        public int DNI {get; set;}
        public bool empleado {get; set;}
    }
    
}