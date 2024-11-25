describe('connect to test db', () => {
  it('can connect to db', () => {
    cy.task("queryDb", "CREATE TABLE Students (StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))");
  });

it('input entries', ()=> {
cy.task("queryDb", 
  `INSERT INTO Students (StudentID, FirstName, StudentGroup, City) VALUES
  (1, "Ivan", "01", "Gomel"),
  (2, "Alexey", "02", "Hrodna"),
  (3, "Pavel", "02", "Minsk"),
  (4, "Anna", "02", "Vitebsk"),
  (5, "Oleg", "03", "Minsk");`
).then((result) => {
  cy.log(JSON.stringify(result));
  expect(result.affectedRows).to.eq(5);
})
});

it('select', ()=>{
cy.task("queryDb", 
  `SELECT FirstName FROM Students WHERE City="Hrodna"`
).then((result) => {
    cy.log(JSON.stringify(result));
    expect(result[0].FirstName).to.eq("Alexey");
  })
});

it('select Negative', ()=>{
  cy.task("queryDb", 
    `SELECT City FROM Students WHERE StudentGroup="03"`
  ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result).to.have.length(1);
      expect(result[0].City).to.eq("Hrodna");
    })
  });

  it('select Positive', ()=>{
    cy.task("queryDb", 
      `SELECT FirstName FROM Students WHERE StudentGroup="02"`
    ).then((result) => {
        cy.log(JSON.stringify(result));
        expect(result).to.have.length(3);
        expect(result[0].FirstName).to.eq("Alexey");
        expect(result[1].FirstName).to.eq("Pavel");
        expect(result[2].FirstName).to.eq("Anna");
      })
    });

  it("can delete the db", ()=>{
    cy.task("queryDb","DROP TABLE Students");
  });
});


  