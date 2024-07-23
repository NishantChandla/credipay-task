import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1721705698989 implements MigrationInterface {
  name = 'Migration1721705698989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order_entity_paymentmethod_enum" AS ENUM('bnpl', 'creditcard')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_entity" ("id" SERIAL NOT NULL, "externalId" character varying, "subtotalAmountCents" integer NOT NULL, "taxAmountCents" integer NOT NULL, "shippingCostCents" integer NOT NULL, "buyerTaxId" character varying NOT NULL, "paymentTerms" integer NOT NULL, "paymentMethod" "public"."order_entity_paymentmethod_enum" NOT NULL DEFAULT 'bnpl', "shippingAddress1" character varying(255) NOT NULL, "shippingAddress2" character varying(255) NOT NULL, "shippingCity" character varying(100) NOT NULL, "shippingRegion" character varying(100) NOT NULL, "shippingPostalCode" character varying(50) NOT NULL, "shippingCountry" character varying(50) NOT NULL, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "amountCents" integer NOT NULL, "productId" integer, "orderId" integer, CONSTRAINT "PK_c12e105219e59720676c72957dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "amountCents" integer NOT NULL, CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_9ab23dbbebb09189f395316b609" FOREIGN KEY ("productId") REFERENCES "product_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_cd7ee8cfd1250200aa78d806f8d" FOREIGN KEY ("orderId") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_cd7ee8cfd1250200aa78d806f8d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_9ab23dbbebb09189f395316b609"`,
    );
    await queryRunner.query(`DROP TABLE "product_entity"`);
    await queryRunner.query(`DROP TABLE "order_item_entity"`);
    await queryRunner.query(`DROP TABLE "order_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."order_entity_paymentmethod_enum"`,
    );
  }
}
