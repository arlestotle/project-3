# Project-3: Texas Missing Cases and Visualizations

### Group 8 (Jose Gonzalez, Shannon Williams, Nancy Ulloa, Arle Alcid) 

## Introduction
For this project we were interested in creating visualiztions for the missing persons cases in the state of Texas. To start, we wanted to identify how many missings people were reported in Texas. Then we wanted to know exactly what cities the missings cases occured. Similarly, we wanted to look at various demographics for the missing cases including: age, race, and sex to see if there were any hot zones for specific characerisitcs. Before beginning the project, we hypothesized that they may be a higher concentration of missing persons major cities with dense populations, as well as in geographical areas near cave systems, national parks, and state parks.

## How to interact with the project 

#### Scraping and Cleaning
In order to create the visualizations, the data must be scraped from the Charley Project website. In the Charely Project Scraping.ipynb a chrome browser was initiated to navigate users to the advanced search page of the Charley Project website. Then the beautiful soup library was used to parse through the 966 missing persons cases in Texas and returned the name, reported missing city, and demographics of individuals from their respective links. The data was put into a dataframe and exported as the Missing.csv.  

Following along with the coordinates.ipynb file, the latitude and longitude for the location of missing people were added thorugh the use of MongoDB and the library geopy.geocoders. The dataset was imported via terminal using "mongoimport --type csv -d texas_missing -c cases --drop --headerline --drop Missing.csv". During this process 18 individuals were removed from the dataset because they did not the contain a reported missing location. The remaining 948 cases were exported as the coordinates.csv. 

The final portion of data cleaning can be found in the cleaning.ipynb. Using pandas, all missing persons cases with incomplete data were removed, columns containining multiple variables were split, and data types were altered into a more usable format. The final dataset contained 841 cases and was exported as the cleaned.csv. 

#### Flask API
To call in the dataset direct from MongoDB a Flask app must be created using the "flask_pymongo" and "flask_cors" which were not perviously covered in the class. The line of code: "mongoimport --type csv -d cleaned -c cases --drop --headerline --drop cleaned.csv" must be run in new terminal window in the resources folder. From there the local host server, "http://127.0.0.1:5000/" can be accessed to naviate to the interactive map html. 

#### Interactive maps 

##### Case Cluster Map
The local host server was used to access the cleaned json data. A function was created to create an array containing the latitude, longitude, name, missing age, and missing city name of the each individual. A second function was created to count the number of cases that occured in at each city location. It is important to note that the latitude and longitude coordinates that were added from the geopy.geocoders library were the general coorinates of cities rather than exact locations of where individals were reported missing. Three overlay map markers were created to visualize missing persons. The first marker, "Locations", loops through all cities in the array and counts the number of reported cases from each unique location. When clicking on the marker, it displays the name and age of the first person in the the array that went missing in that location. The second marker, "Radius", creates a red dot at each location proportional to the number of reported cases in that area. For instance, there is a smaller marker over Abilene, Texas than Houston, Texas indicating that there were more reported missing people in Houston. The third marker, "Clust", creates an interactive cluster map containing the number of misssing individuals in each location. As you zoom into the map, the individual markers are created to display the name and age of individials. 

##### Demographic Heat Map 
The local host server was used to access the cleaned json data. A function was created to count the amount of individual missing cases by various demograpics including gender: male and female, case classification: missing, endangered missing, migrant, family abduction, non-family abduction, and lost/injured missing, ethnicity: black, asian, hispanic, and white, and the number of people reported missing from a specific decade: 40's - 1 case, 50's - 2 cases, 60's - 2 cases, 70's - 35 cases, 80's - 144 cases, 90's - 176 cases, 00's - 242 cases, 10's - 197 cases, 20's - 42 cases.


## Efforts for Ethical Consideration
Our initial idea was to map missing persons cases in state and national parks and compare them to geographical locations of cave systems. After consideration, we realized if we were to focus on cave systems, we would introduce a level of selection bias that assumes most missing persons cases occur near natural parks rather than densely populated cities and suburbs. It is also likely that we do not have a complete dataset since not all missings people may have been documented and reported. For example, homeless people. As previously mentioned the latitude and longitude coordinates that were added from the geopy.geocoders library were the general coorinates of cities rather than exact locations of where individals were reported missing. This may skew the reported cases in majpor cities as people may have gone missing the the surrounding suburbs. 


## Data Sources
For this project, we created one csv file containing data scraped directly from charleyprojec.org, a public database that records all reported cases of persons missing for at least one year. The final csv for analysis contained demographic information on missing persons as well as the dates and locations for which individials were reported missing 


## Conclusion
Through the our data visualizations, we concluded that most missing cases occur in densely populated cities: 112 in Houston, 48 in Dallas, 41 in San Antinio, and 33 in Austin, whereas, smaller towns like Lubbock only contained 2 missing persons. Looking at the heat map demographics there appears to be a higher concentration of non-family abductions in the heart of major cities and a higher concentration of family adbuctions on the suburbs of large cities. There appears to be more migrant missing cases in south Texas which makes sense as it is closer to the border of Mexico. 
To touch base on our original idea for the project, it cannot be concluded whether or not there is an increased amount of missing cases near national and state parks due to dense populations of large cities. We found it interesting that there does not appear to be any reported lost/injured cases on the heat map over Big Bend, which is the largest national park in Texas.

### Contributions
Jose Gonzalez - Data Scraping, Flask API, and Heat Maps
Shannon Williams - Cluster Maps
Nancy Ulloa - Data Cleaning Coordinates and Conclusions
Arle Alcid - Final Data Cleaning and ReadMe 

