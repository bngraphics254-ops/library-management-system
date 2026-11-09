## Schema Decisions

### 1. Book and Genre Relationship

The `Book` model references the `Genre` model through the `genreId` foreign key instead of embedding genre information directly in each book.

This creates a one-to-many relationship:
- One genre can contain many books.
- Each book belongs to one genre.

I chose this design because it avoids duplicating genre names and descriptions across multiple book records. It also improves data consistency because genre information is stored and maintained in one place.

The foreign key ensures referential integrity by making sure that every book references an existing genre.

### 2. User and Role Design

The `User` model uses a `Role` enum with two values: `PATRON` and `LIBRARIAN`.

This ensures that users have clearly defined roles and prevents invalid role values from being stored in the database.

### 3. Prisma vs. Document Databases

One thing I found different when modeling in Prisma compared with a document database such as MongoDB is how relationships are handled.

In Prisma with PostgreSQL, relationships are explicitly defined using foreign keys and relations. In MongoDB, related information can instead be embedded inside documents or connected using references.

I found Prisma's relational approach useful because it helps maintain data consistency and makes relationships between books and genres easier to manage.