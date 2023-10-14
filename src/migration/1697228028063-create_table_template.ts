import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableTemplate1697228028063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public.template (
                id integer NOT NULL,
                user_id integer NOT NULL,
                name character varying NOT NULL,
                status character varying NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id),
                foreign key (user_id) references public.user(id)
            );

            CREATE SEQUENCE public.template_id_seq
                AS integer
                START WITH 1
                INCREMENT BY 1
                NO MINVALUE 
                NO MAXVALUE
                CACHE 1;

            ALTER SEQUENCE public.template_id_seq OWNED BY public.template.id;
            ALTER TABLE ONLY public.template ALTER COLUMN id SET DEFAULT nextval('public.template_id_seq'::regclass);

        
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "template";
        `);
    }

}
