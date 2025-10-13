create Table Client(
    id SERIAL Primary key,
    name VARCHAR(255),
    telephon VARCHAR(255),
    mail VARCHAR(255),
    password VARCHAR(255)
);

create TABLE ReadyOrders(
    id SERIAL primary key ,
    title VARCHAR(255),
    price integer,
    info VARCHAR,
    photo BYTEA
);


create TABLE ReadyOrdersStories(

    quantity integer,

    client_id integer,
    foreign key (client_id) references Client (id),

    readyorder_id integer,
    foreign key (readyorder_id) references ReadyOrders(id)
);


-------

create TABLE Materials(
    id SERIAL primary key,

    title VARCHAR(255),
    info VARCHAR(255),
    price INTEGER,
    photo BYTEA
);

create TABLE Orders(
    id SERIAL primary key,

    client_id integer,
    foreign key (client_id) references Client (id),

    material_id integer,
    foreign key (material_id) references Materials (id),

    height INTEGER,
    width INTEGER,
    quantity INTEGER
);

