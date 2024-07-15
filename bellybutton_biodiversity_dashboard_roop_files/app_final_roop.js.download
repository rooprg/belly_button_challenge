// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

     // get the metadata field
     let metaData = data.metadata;
    
     // Filter the metadata for the object with the desired sample number
     let sampNumb = metaData.filter(samplesObj => samplesObj.id == sample);
     let samp = sampNumb[0];
     
     // Use d3 to select the panel with id of `#sample-metadata`
     let sammeta = d3.select("#sample-metadata");
 
     // Use `.html("") to clear any existing metadata
     sammeta.html("");
 
     // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
     for (key in samp){
       sammeta.append("h6").text(`${key.toUpperCase()}: ${samp[key]}`)
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
 
     //Build a Bubble Chart

    var data1 = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
         size: sample_values,
          color: otu_ids
        }
      }
    ];
        
    var layout1 = {
      title: "Bacteria Culture Per Sample",
      hovermode: "closest",
      xaxis: {title: "OTU ID"},
      yaxis: {title: "Number of Bacteria"}
    };
    
    // Render the Bubble Chart
    Plotly.newPlot("bubble", data1, layout1);
    
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let yticks = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    let rssv = sample_values.slice(0,10).reverse();
    let rotu = otu_labels.slice(0,10).reverse()
    
    var data2 = [
      {
        y:yticks,
        x:rssv,
        text:rotu,
        type:"bar",
        orientation:"h"
      }
    ];

    var layout2 = {
      title:"Top 10 Bacteria Cultures Found",
      xaxis: {title: "Number of Bacteria"}
    };
    
    // Render the Bar Chart
    Plotly.newPlot("bar", data2, layout2);
  }
)};

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let sampleNames = data.names;
   
   // Use d3 to select the dropdown with id of `#selDataset`
   let idselector = d3.select("#selDataset");
     
   // Use the list of sample names to populate the select options
   // Hint: Inside a loop, you will need to use d3 to append a new
   // option for each sample name.

   for (let i = 0; i < sampleNames.length; i++) {
     idselector.append("option")
     .text(sampleNames[i])
     .property("value", sampleNames[i]);
   };
   
   // Get the first sample from the list
   let firstSample = sampleNames[0];

   // Build charts and metadata panel with the first sample

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
 
 // Initialize the dashboard
 init();
 