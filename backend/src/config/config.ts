export const config = () => ({
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
  },
  credipayBaseUrl: process.env.CREDIPAY_BASE_URL,
  credipayApiKey: process.env.CREDIPAY_API_KEY,
  sellerTaxId: process.env.SELLER_TAX_ID,
});
