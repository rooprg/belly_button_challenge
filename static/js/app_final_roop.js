// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

     // get the metadata field
     let metaData = data.metadata;
    
     // Filter the metadata for the object with the desired sample number
     let sampNumb = metaData.filter(sampleObj => sampleObj.id == sample);
     let samp = sampNumb[0];
     
     // Use d3 to select the panel with id of `#sample-metadata`
     let sammeta = d3.select("#sample-metadata");
 
     // Use `.html("") to clear any existing metadata
     sammeta.html("");
 
     // Loop for d3 to append new tags for each key-value in filtered metadata
     for (key in samp){
       sammeta.append("h6").text(`${key.toUpperCase()}: ${result[key]}`)
     };
   });
 };
 
 // function to build both charts
 function buildCharts(sample) {
   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
     // Get the samples field
     let samples = data.samples;
     
     // Filter the samples for the object with the desired sample number
     let sampNumb1 = samples.filter(sampleObj => sampleObj.id ==sample);
     let samp1 = sampNumb1[0]
     
     // Get the otu_ids, otu_labels, and sample_values
     let otu_ids = samp1.otu_ids
     let otu_labels = samp1.otu_labels
     let sample_values = samp1.sample_values;
 
     
     // Build the bubble chart
var trace1 = {
  x: otu_ids,
  y: sample_values,
  text: otu_labels,
  mode: "markers",
  marker: {
    size: sample_values,
    color: otu_ids
  }
};

var data = [trace1];   

var layout = {
  title: "Bacteria Cultures Per Sample",
  hovermode: "closest",
  xaxis: {title: "OTU ID"},
  yaxis: {title: "Number of Bacteria"}
};

// Render the bubble chart to the div tag in the HTML file with id="bubble"
Plotly.newPlot("bubble", data, layout);
     
    // Build the bar chart
    // For the bar chart, map the otu_ids to a list of strings for the yticks
    let yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    var trace2 = {
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels(0,10).reverse(),
      type: "bar",
      orientation: 'h',
      marker: {
        color: 'blue',
        size: 10
        }
      }
    });

    var data2 = [trace2];

    var layout2 = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"},
      yaxis: {title: "OTU_ID"},
      showlegend: false
    };

    // Render the bar chart to the div tag in html file with id="bar"
    Plotly.newPlot("bar", data2, layout2);
  }
)};

// Function to initialize the dashboard

 function init() {
   
   // Use d3 to select the dropdown with id of `#selDataset`
   let selector = d3.select("#selDataset");
   
   // Get the names field
   d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
   let sampleNames = data.names;
   
   // From the list of sample names, populate the select options
   // with a loop using d3 to append a new option for each sample name
   for(let i = 0; i < sampleNames.length; i++) {
     selector.append("option")
     .text(sampleNames[i])
     .property("value", sampleNames[i]);
   };
   
   // Build charts and metadata panel with the first sample
   let firstSample = sampleNames[0];
   buildCharts(firstSample)
   buildMetadata(firstSample);
 });
 }
 
 // Function for event listener
 function optionChanged(newSample){

   // Build charts and metadata panel each time a new sample is selected
   buildCharts(newSample);
   buildMetadata(newSample);
 }
 
 // Initialize the dashboard, placing code at end to aid readability
 init();
 