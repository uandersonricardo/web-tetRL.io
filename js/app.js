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
            pointRadius: 0,
            display: false
        }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          display: false,
          ticks: {
            suggestedMin: 0,
            beginAtZero: true
          },
          gridLines: {
            display: false
          }
        }],
        xAxes: [{
          display: false,
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
    window.fitness = [...window.fitness.slice(-9), reward];
  }

  window.setChart();

  window.tetrominoes = tetrominoes;
  
  document.querySelector(".next-score-text").innerHTML = "Placar: " + score;
}

window.setChart = () => {
  chart.data.datasets[0].data = window.fitness;
  chart.update(0);
}

window.tetrominoes = 0;
window.fitness = [0, 0];