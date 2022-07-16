# ACES

AS A municipal assessor
I WANT to track property assessments and property inventory to support assessments
SO THAT I may create an equitable assessment roll

GIVEN an application-style site
WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes a property search form, navigation links for the homepage and the (dashboard?), and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on the dashboard option or the log in option
THEN I am prompted to login
WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out
WHEN I click on the dashboard option
THEN I am presented with a list of properties I have accessed in descending order of date and time accessed
WHEN I submit the property search form
THEN I am presented with a list of properties that meet the search parameters
WHEN I click on a property
THEN I am presented with the parcel details, including photos and map, including assessed value and owner(s), and a list of buildings
WHEN I click on edit parcel
THEN I am presented with a form to edit parcel details and save
WHEN I click on add parcel
THEN I am presented with an empty form to add parcel details and save
WHEN I click on delete parcel
THEN the parcel and any associated buildings and photos are deleted from the database
WHEN I click on a building
THEN I am presented with the building details
WHEN I click on edit building
THEN I am presented with a form to edit building details and save
WHEN I click on add building
THEN I am presented with an empty for to add building details and save
WHEN I click on delete building
THEN the building is deleted from the database



Jargon:

 Parcel: a property, a piece of land, which may have improvements on it such as a single-family home, a multi-family dwelling, or more than one structure, like a single-family home and detached garage. However the Parcel usually represents the land.

 Inventory: detailed info about a property or structure, like acres for land, zoning, wetlands, and for a building things like bedrooms, bathrooms, square foot living area.

 Swis Code: 6-digit code to identify a municipality

 Section, Subsection, Block, Lot, Sublot, Suffix uniquely identify a property within a Swis Code.

 SwisSBLKey: Concatenation of Swis Code, Section, Subsection, Block, Lot, Sublot, Suffix, uniquely identifies a property in NY State.

 Property ID, PrintKey: A more readable combination of Section, Subsection, Block, Lot, Sublot, Suffix like 02.01.1 might be Section 2, Subsection 1, Block 1.


