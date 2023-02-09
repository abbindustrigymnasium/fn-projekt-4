[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9883251&assignment_repo_type=AssignmentRepo)

## motivation för hemsidan
våran tanke är att vi ska visa vattenkvaliteten i vatten över hela världen så att man vet var det finns en säker källa av vatten. Vi vill att man ska bli mer medveten om vattenkvaliteten runt om sig och tänka mer på vad man t.ex badar i och vad man använder vattnet till. 

# Databas schema
<img src="https://github.com/abbindustrigymnasium/fn-projekt-4/blob/main/databas%20schema.png" width="600" height="350">

#### Det som finns i själva databasen är:
* Vote
* User
* Country
* Continent
#### Hur håller allt ihop?
* Inom user så lagrar vi persnolig information om just din användare, som man sedan använder för att rösta. Denna rösten lagras i en specifik user som är inloggad.
* Inom Country och Continent så lagras all information från mätdata från en csv fil, som vi sedan använder i vår applikation.
