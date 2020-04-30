const bricks = $('#bricks');

let optgroup    = bricks[0].selectedOptions[0].parentNode.label;
let selectValue = bricks[0].value;
let color       = 'Grey';
let picture     = null;

// On brick select
bricks.change(function(e) {
    optgroup = e.target.selectedOptions[0].parentNode.label;
    selectValue = e.target.value;

    if (optgroup == 'Paving Bricks') {
        const colors = `
            <div class="form-group wow fadeIn">
              <select id="color" class="form-control mt-3">
                  <option>Grey</option>
                  <option>Red</option>
              </select>
            </div>
        `;

        !$('#color').length && $(colors).insertAfter('#bricks');
    } else {
        $('#color').length && $('#color').remove();
    }
});

// On click
$("#calculator").submit(function(e) {
    e.preventDefault();

    let price = 0;
    let rows = null;
    let bricksNeeded = 0;

    const table  = $('#table');
    const length = $('#length').val();
    const height = $('#height').val();

    // Reset table
    table.html(null);

    if (length == '' || length < 1) {
        return alert('Length must be a valid number.');
    }

    if (height == '' || height < 1) {
        return alert('Height must be a valid number.');
    }

    const area = length * height;

    if (selectValue == 'Maxi Plain Bricks' || selectValue == 'Maxi Diamond Bricks') {
        bricksNeeded = area * 32;
        price = bricksNeeded * 4.31;
        picture = (selectValue == 'Maxi Plain Bricks') && 'Plain.jpeg';
    } else {
        bricksNeeded = area * 50;
        if (selectValue == 'Stock Building Bricks') {
            price = bricksNeeded * 2.02;
            picture = 'stock.jpeg';
        }

        color = $('#color').val();

        // Paving
        if (selectValue == 'Bevel Edge Paving Bricks') {
            (color == 'Grey') ? price = bricksNeeded * 2.24 : price = bricksNeeded * 2.69;
            (color == 'Grey') ? picture = 'Bevel Grey.jpeg' : picture = 'Bevel Red.jpeg';
        }
        if (selectValue == 'Interlock 60mm Paving Bricks') {
            (color == 'Grey') ? price = bricksNeeded * 2.59 : price = bricksNeeded * 2.82;
            picture = (color == 'Grey') && '60mm.jpeg';
        }    
        if (selectValue == 'Interlock 80mm Paving Bricks') {
            (color == 'Grey') ? price = bricksNeeded * 3.39 : price = bricksNeeded * 3.62;
            picture = (color == 'Grey') && '80mm.jpeg';
        }
    }

    if (optgroup == 'Paving Bricks') {

        const display = `
            <tr class="wow fadeIn">
                <td><img src="assets/img/bricks/${picture}" width="250"</td>
                <td>&nbsp;</td>
            </tr>
        `;
        
        rows = `
            ${picture && display}  
            <tr class="wow fadeIn">
                <td>Floor in meters<sup>2</sup></td>
                <td>${area}</td>
            </tr>
            <tr class="wow fadeIn">
                <td>Bricks Needed</td>
                <td>${bricksNeeded}</td>
            </tr>
            <tr class="wow fadeIn">
                <td>Color</td>
                <td>${color}</td>
            </tr>
            <tr class="wow fadeIn">
                <td>Total Price</td>
                <td>R${Math.ceil(price)}.00</td>
            </tr>
        `;
    } else {

        const display = `
            <tr class="wow fadeIn">
                <td><img src="assets/img/bricks/${picture}" width="250"</td>
                <td>&nbsp;</td>
            </tr>
        `;

        rows = `
            ${picture && display}            
            <tr class="wow fadeIn">
                <td>Wall in meters<sup>2</sup></td>
                <td>${area}</td>
            </tr>
            <tr class="wow fadeIn">
                <td>Bricks Needed</td>
                <td>${bricksNeeded}</td>
            </tr>
            <tr class="wow fadeIn">
                <td>Total Price</td>
                <td>R${Math.ceil(price)}.00</td>
            </tr>
        `;
    }
    table.append(rows);


});