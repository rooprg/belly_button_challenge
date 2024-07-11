// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;
    
    // Filter the metadata for the object with the desired sample number
    let sampNumb = metadata.filter(sampleObj => sampleObj.id == sample);  
    let samp = sampNumb[0]

    // Use d3 to select the panel with id of `#sample-metadata`
    let sammeta = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sammeta.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (key in samp){
    sammeta.append("h6").text(`${key}: ${samp[key]}`);
    };
  });
};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampNumb1 = samples.filter(sampleObj => sampleObj.id == sample);
    let samp1 = sampNumb1[0]

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = samp1.otu_ids;
    let otu_labels = samp1.otu_labels;
    let sample_values = samp1.sample_values;

    // Build a Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values
      }
    };

    var data = [trace1];

    var layout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU_ID" },
      yaxis: {title: "Number of Bacteria"},
      showlegend: false,
      height: 600,
      width: 600
    }

    // Render the Bubble Chart
    Plotly.newPlot('myDiv', data, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otu_ids.map(otuID => `OTU ${otuID}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
      let yticksSliced = yticks.slice(0,10)
      let yticksRev = yticksSliced.reverse();

      var trace2 = {
        x: ,
        y: ,
        name: 
        orientation: 'h',
        type: 'bar',
        marker: {
          color: 'blue',
          size: 10
        }
      }
  
      var data2 = [trace2];
  
      var layout2 {
        title: "Top 10 Bacteria Cultures Found",
        xaxis: {title: "OTU_ID" },
        yaxis: {title: "Number of Bacteria"},
        showlegend: false,
        height: 600,
        width: 600
      }
  };

    // Render the Bar Chart
    Plotly.newPlot('myDiv', data2, layout2);

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let metadata = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let pageID = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
