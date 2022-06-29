using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiRest.Models;

    public class ApirestDB : DbContext
    {
        public ApirestDB (DbContextOptions<ApirestDB> options)
            : base(options)
        {
        }

        public DbSet<ApiRest.Models.Person>? Person { get; set; }
    }
