const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
  {
    View: 'Bullish',
    Value: {
      /*'24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call'],
      '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread'],
      '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call'],*/
      '24-Apr-2024': ['Bull Call Spread','Bull Put Spread','Bull Put Spread','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy1','Strategy1','SpreadStrategy','Bull Call Spread'],
      '02-May-2024': ['Bull Call Spread','Bull Call Spread','Bull Put Spread','Long Call','Long Call','Long Call','Bull Put Spread','Bull Call Spread','Strategy1','Bull Call Spread','Strategy2','Strategy1','Strategy2','Bull Call Spread'],
       '09-May-2024': ['Strategy Put','Strategy Call','Strategy Call','Strategy Call','Strategy Put'],
    }
  },

  {
    'View': 'Bearish',
    'Value': {
    '24-Apr-2024': ['Bear Call Spread','Bear Call Spread','Bear Call Spread','Long Put','Long Put','Long Put','Bear Call Spread',],
    '31-May-2024': ['Long Put','Long Put','Long Put','Long Put','Long Put'],
    '21-Jun-2024': ['Strategy3','Strategy3','Bear Put Spread','Strategy3','Long Put','Long Put'],
    }
    },

    {
      'View': 'RangeBound',
      'Value': {
      '24-Apr-2024': ['Short Straddle','Short Strangle','Short Strangle','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy1','Strategy1','SpreadStrategy','Short Straddle'],
      '02-May-2024': ['Short Straddle','Short Straddle','Short Strangle','Iron Butterfly','Iron Butterfly','Iron Butterfly','Short Strangle','Short Straddle','Strategy1','Short Straddle','Strategy2','Strategy1','Strategy2','Short Straddle'],
      '21-Jun-2024': ['Iron Condor','Iron Butterfly','Iron Butterfly','Iron Butterfly','Iron Condor'],
      }
      },

      {
        'View': 'Volatile',
        'Value': {
        '02-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy1','Strategy1','Spread-Strategy','Long Straddle'],
        '09-May-2024': ['Long Straddle','Long Straddle','Long Strangle','Long Strangle','Long Straddle','Strategy1','Long Straddle','Strategy2','Strategy1','Strategy2','Long Straddle'],
        '31-May-2024': ['Long Straddle','Long Strangle','Long Strangle','Long Strangle','Long Straddle'],
        }
        }
  
];

const toggleButtons = document.querySelectorAll('.toggle-btn');
const dateDropdown = document.getElementById('date-dropdown');
const cardContainer = document.getElementById('card-container');

let currentView = 'Bullish';

function renderDates() {
  dateArray.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = date;
    dateDropdown.appendChild(option);
  });
}

function renderCards() {
  cardContainer.innerHTML = '';
  const selectedDate = dateDropdown.value;
  const viewData = strategyArray.find(strategy => strategy.View === currentView)?.Value[selectedDate] || [];

  if (viewData.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `There are no strategies for <br>${selectedDate}`;

    cardContainer.appendChild(emptyState);
  } else {
    const strategyCount = viewData.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});

    for (const [strategy, count] of Object.entries(strategyCount)) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h4>${strategy}</h4><p>${count} ${count > 1 ? 'Strategies' : 'Strategy'}</p>`;
      cardContainer.appendChild(card);
    }
  }
  
}

toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    toggleButtons.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');
    // currentView = btn.dataset.view;
    currentView = btn.id;  // Using the id instead of dataset
    renderCards();
  });
});

dateDropdown.addEventListener('change', renderCards);

document.addEventListener('DOMContentLoaded', () => {
  renderDates();
  renderCards();
});
