const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ggzddpzwasznwpvowvib.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnemRkcHp3YXN6bndwdm93dmliIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDMyMDUxMywiZXhwIjoxOTk1ODk2NTEzfQ.aevCof4Vlw0J1X-OBo3jF_Dw78xUqMqU3_HPUhV4pSE'

const supabase = createClient(supabaseUrl, supabaseKey, {
    debug: true // Habilita la herramienta de depuración
  });

  
  const productId = 1645; // reemplaza con el ID de tu producto
  
  supabase
    .from('sales')
    .select(
      `
        DATE_TRUNC('week', date) as week_start,
        SUM(units) as total_sales
      `
    )
    // .eq('productId', productId)
    .order('week_start')
    .then((response, error) => {
      if (error) {
        console.error(error);
        return;
      }
  
      console.log(response.data);
    });
  