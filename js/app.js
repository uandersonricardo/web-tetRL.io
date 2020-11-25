window.start = () => {
  document.querySelector(".main").classList.add("d-none");
  document.querySelector(".game").classList.remove("d-none");

  window.ctx = document.getElementById('myChart').getContext('2d');
  window.chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: window.fitness,
        datasets: [{
            data: window.fitness,
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            fill: false,
            borderWidth: 2,
            pointRadius: 0
        }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          color: '#ffffff',
          gridLines: {
            display: false
          },
          ticks: {
            fontColor: '#ffffff',
            suggestedMin: 0,
            beginAtZero: true
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          ticks: {
            display: false
          }
        }]
      }
    }
  });

  window.setChart();
}

window.render = (raw) => {
  let json = JSON.parse(raw);
  let matrix = json.matrix;
  let reward = json.reward;
  let score = json.score;
  let tetrominoes = json.tetrominoes;
  let state = json.state;

  let children = document.querySelector(".grid").children;
  for (let row = 0; row < 20; row++) {
    let scored = false;

    if (!matrix[row].includes(0)) {
      scored = true;
    }

    for (let col = 0; col < 10; col++) {
      children[row * 10 + col].classList.remove("scored");

      if (matrix[row][col] >= 1) {
        children[row * 10 + col].classList.add("block");

        if (scored) {
          children[row * 10 + col].classList.add("scored");
        }
      } else {
        children[row * 10 + col].classList.remove("block");
      }
    }
  }

  if (window.tetrominoes !== tetrominoes) {
    window.fitness = [...window.fitness.slice(-99), reward];
  }

  document.querySelector("#lines").innerHTML = score;
  document.querySelector("#holes").innerHTML = state[1];
  document.querySelector("#bumpiness").innerHTML = state[2];
  document.querySelector("#height").innerHTML = state[3];

  window.setChart();

  window.tetrominoes = tetrominoes;
  
  document.querySelector(".next-score-text").innerHTML = "Placar: " + (score*10);
}

window.setChart = () => {
  chart.data.datasets[0].data = window.fitness;
  chart.data.labels = window.fitness;
  chart.update(0);
}

window.tetrominoes = 0;
window.fitness = [0, 0];