const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const csv = require('csv-parser');

// Configura las credenciales de Supabase
const supabaseUrl = 'https://ggzddpzwasznwpvowvib.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnemRkcHp3YXN6bndwdm93dmliIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDMyMDUxMywiZXhwIjoxOTk1ODk2NTEzfQ.aevCof4Vlw0J1X-OBo3jF_Dw78xUqMqU3_HPUhV4pSE'
const supabase = createClient(supabaseUrl, supabaseKey);

// Define el nombre de la tabla de ventas en la base de datos
const salesTable = 'sales';

// Lee el archivo CSV en una matriz
const salesData = [];
fs.createReadStream('Historical_Data.csv')
  .pipe(csv())
  .on('data', (row) => {
    salesData.push(row);
  })
  .on('end', async () => {
    // Agrega todos los datos a la tabla de ventas de la base de datos
    const { data, error } = await supabase.from(salesTable).insert(salesData);
    if (error) {
      console.error(error);
      return;
    }
    console.log(`${data.length} sales added to table ${salesTable}`);
  });