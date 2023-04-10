const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const csv = require('csv-parser');

// Configura las credenciales de Supabase
const supabaseUrl = 'https://ggzddpzwasznwpvowvib.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnemRkcHp3YXN6bndwdm93dmliIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDMyMDUxMywiZXhwIjoxOTk1ODk2NTEzfQ.aevCof4Vlw0J1X-OBo3jF_Dw78xUqMqU3_HPUhV4pSE'
const supabase = createClient(supabaseUrl, supabaseKey);

// Crea un conjunto vacío para almacenar los productId únicos
const uniqueProductIds = new Set();

// Lee el archivo CSV
fs.createReadStream('Historical_Data.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Agrega el productId al conjunto de productId únicos
    const productId = row.Article_ID;
    uniqueProductIds.add(productId);
  })
  .on('end', async () => {
    // Itera sobre el conjunto de productId únicos y los agrega a la tabla de la base de datos
    const productsTable = 'products';
    for (const productId of uniqueProductIds) {
      const { data, error } = await supabase.from(productsTable).insert([{ id: productId, name: String(productId), stock: 0 }]);
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Product ${productId} added to table ${productsTable}`);
    }
  });
