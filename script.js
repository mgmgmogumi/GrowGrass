
const COLOR_ARRAY = ['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'];
const grid = document.getElementById("grid");

let color_value;

const growGrass = function (i,j) {
  // alert(i+','+j);
  const rect = document.getElementById(i+'-'+j);
  if(color_value[i][j] == 4) {
    color_value[i][j] = 0;
  } else {
    color_value[i][j]++;
  }
  rect.style.fill = COLOR_ARRAY[color_value[i][j]];
}

const draw = (I_MAX,J_MAX) => {
  color_value = Array.from(new Array(I_MAX), () => new Array(J_MAX).fill(0));
  for (let i=0; i<I_MAX; i++) {
    grid.insertAdjacentHTML('beforeend','<g transform="translate(' + i*16 + ', 0)" id="c' + i + '"></g>');
    const newColumn = document.getElementById('c'+i);
    for (let j=0; j<J_MAX; j++) {
        newColumn.insertAdjacentHTML('beforeend',
        '<rect class="day" id="'+i+'-'+j+'" width="11" height="11" x="16" y="'+15*j+'" fill="#ebedf0" onclick="growGrass('+i+','+j+')"></rect>');
    }
  }
}

const setMonth = (M_MIN) => {
  const MONTH_ARRAY = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let month = new Date().getMonth();
  let x = 0
  for (let m=month-M_MIN; m<month; m++) {
    let i = m;
    if(i<0) i += 12;
    grid.insertAdjacentHTML('beforeend','<text x="' + (x*64+16) + '" y="-8" class="month">'+MONTH_ARRAY[i]+'</text>');
    x++;
  }
}


// メディアクエリ（この場合、768px以上をPCとする）
const mediaQuery = matchMedia('(min-width: 768px)')

const mediaQueryDetection = mq => {
  if (mq.matches) {
    draw(49,7);
    setMonth(12);
  } else {
    draw(20,7);
    setMonth(5);
  }
}

// ページ読み込み時
mediaQueryDetection(mediaQuery);

// ウィンドウリサイズ時
mediaQuery.addListener(mediaQueryDetection);