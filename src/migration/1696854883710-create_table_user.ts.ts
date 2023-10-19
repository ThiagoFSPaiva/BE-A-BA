import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTableUser1696854883710 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
            CREATE TYPE type_user_enum AS ENUM ('user', 'admin');

            CREATE TABLE public.user (
                id integer NOT NULL,
                name character varying(255) NOT NULL UNIQUE,
                email character varying(255) NOT NULL UNIQUE,
                matricula character varying(6) NOT NULL UNIQUE,
                cpf character varying(255) NOT NULL, 
                type_user type_user_enum NOT NULL, 
                password character varying(255) NOT NULL,
                created_at timestamp without time zone DEFAULT now() NOT NULL,
                updated_at timestamp without time zone DEFAULT now() NOT NULL,
                primary key (id)
            );

            CREATE SEQUENCE public.user_id_seq
                as integer
                start with 1
                increment by 1
                NO MINVALUE
                NO MAXVALUE
                CACHE 1;

            Alter SEQUENCE public.user_id_seq OWNED BY public.user.id;
            Alter TABLE ONLY public.user ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "user";
        `);
    }

}
