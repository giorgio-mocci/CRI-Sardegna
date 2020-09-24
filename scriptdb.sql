CREATE TABLE IF NOT EXISTS comitati(
nome VARCHAR(22) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS volontari(
cf CHAR(16) PRIMARY KEY,
nome VARCHAR(25) NOT NULL,
cognome VARCHAR(30) NOT NULL,
mail VARCHAR(40) UNIQUE NOT NULL,
telefono CHAR(10) UNIQUE NOT NULL,
password TEXT NOT NULL,
whitelist SMALLINT NOT NULL,
fk_comitato VARCHAR(22) NOT NULL,
DRAE SMALLINT NOT NULL,
responsabile SMALLINT NOT NULL,
CONSTRAINT whiteck CHECK (whitelist=1),
FOREIGN KEY (fk_comitato) REFERENCES comitati(nome) ON UPDATE cascade ON DELETE no action
);

CREATE TABLE IF NOT EXISTS competenze(
nome VARCHAR(30) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS vol_comp(
fk_cf CHAR(16),
fk_nome VARCHAR(30),
FOREIGN KEY (fk_cf) REFERENCES volontari(cf) ON UPDATE cascade ON DELETE cascade,
FOREIGN KEY (fk_nome) REFERENCES competenze(nome) ON UPDATE cascade ON DELETE cascade,
PRIMARY KEY(fk_cf, fk_nome)
);

CREATE TABLE IF NOT EXISTS eventi(
cod_evento SERIAL PRIMARY KEY,
nome VARCHAR(35) NOT NULL,
citta VARCHAR(22) NOT NULL,
descrizione TEXT NOT NULL,
data DATE NOT NULL,
fk_DRAE CHAR(16) NOT NULL, /* controllare che il cf sia di un drae*/
FOREIGN KEY (fk_DRAE) REFERENCES volontari(cf) ON UPDATE cascade ON DELETE no action
);

CREATE TABLE IF NOT EXISTS disponibilita(
fk_volontario CHAR(16),
fk_evento INT,
FOREIGN KEY (fk_volontario) REFERENCES volontari(cf) ON UPDATE cascade ON DELETE no action,
FOREIGN KEY (fk_evento) REFERENCES eventi(cod_evento) ON UPDATE cascade ON DELETE no action,
PRIMARY KEY(fk_volontario, fk_evento)
);

CREATE TABLE IF NOT EXISTS attrezzature_mezzi(
nome VARCHAR(30) PRIMARY KEY,
descrizione TEXT,
quantita INT NOT NULL
);

CREATE TABLE IF NOT EXISTS attr_comitati(
fk_attr VARCHAR(30),
fk_comitato VARCHAR(22),
FOREIGN KEY (fk_attr) REFERENCES attrezzature_mezzi(nome) ON UPDATE cascade ON DELETE cascade,
FOREIGN KEY (fk_comitato) REFERENCES comitati(nome) ON UPDATE cascade ON DELETE no action,
PRIMARY KEY(fk_attr, fk_comitato)
);

do $$
begin

IF (NOT EXISTS (SELECT * FROM pg_trigger WHERE tgname='DRAE')) THEN

CREATE FUNCTION no_DRAE() RETURNS trigger AS $no_DRAE$
    BEGIN
        IF (NOT EXISTS(select * FROM volontari V WHERE NEW.fk_DRAE=V.cf AND V.DRAE=1)) THEN
            RAISE EXCEPTION 'il creatore dell evento non è un DRAE';
		RETURN NULL;
	ELSE
		RETURN NEW;
        END IF;
    END;
$no_DRAE$ LANGUAGE plpgsql;

CREATE TRIGGER NO_DRAE BEFORE INSERT OR UPDATE ON eventi
    FOR EACH ROW EXECUTE PROCEDURE no_DRAE();

END IF;
end
$$
