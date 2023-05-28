describe('GitHub API structure test', () => {
  it('Verify the structure of the JSON response', () => {
    cy.request('https://api.github.com/repos/metrolab/SingleDateAndTimePicker')
      .then((response) => {
        cy.writeFile('response.json', response.body);
        cy.readFile('response.json').then((fileContent) => {
          const expectedKeys = ['id', 'name', 'full_name', 'owner'];
          const responseKeys = Object.keys(fileContent);
          expectedKeys.forEach((key) => {
            expect(responseKeys.includes(key)).to.be.true;
          });
        });
      });
  });
  it('Verify the presence of "seatcode" in owners login field', () => {
    cy.request('https://api.github.com/repos/metrolab/SingleDateAndTimePicker')
      .then((response) => {
        const ownerLogin = response.body.owner.login;
        expect(ownerLogin).to.include('seatcode');
      });
  });
});



