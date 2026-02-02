"""
Database optimization with indexes
"""

async def create_indexes():
    """
    Create indexes for better query performance
    
    Run this once on application startup or manually
    """
    from database import get_db
    
    db = get_db()
    
    try:
        # Users collection indexes
        await db["users"].create_index("email", unique=True)
        print("✅ Created unique index on users.email")
        
        # Contacts collection indexes
        await db["contacts"].create_index("created_at", background=True)
        await db["contacts"].create_index("phone")
        print("✅ Created indexes on contacts")
        
        # Emergencies collection indexes
        await db["emergencies"].create_index("timestamp", background=True)
        await db["emergencies"].create_index("user_name")
        print("✅ Created indexes on emergencies")
        
        # Trips collection indexes
        await db["trips"].create_index("date")
        await db["trips"].create_index("created_at", background=True)
        print("✅ Created indexes on trips")
        
        # Family members collection indexes
        await db["family_members"].create_index("phone")
        await db["family_members"].create_index("relationship")
        print("✅ Created indexes on family_members")
        
        print("\n✅ All database indexes created successfully!")
        
    except Exception as error:
        print(f"❌ Error creating indexes: {error}")

async def drop_all_indexes():
    """Drop all indexes (for development/testing)"""
    from database import get_db
    
    db = get_db()
    collections = ["users", "contacts", "emergencies", "trips", "family_members"]
    
    for collection in collections:
        try:
            await db[collection].drop_indexes()
            print(f"✅ Dropped all indexes on {collection}")
        except Exception as error:
            print(f"⚠️  Could not drop indexes on {collection}: {error}")

# Migration: Create TTL index for temporary data (if needed)
async def create_ttl_indexes():
    """Create TTL (time-to-live) indexes for automatic data cleanup"""
    from database import get_db
    from datetime import timedelta
    
    db = get_db()
    
    try:
        # Emergency alerts older than 90 days will be automatically deleted
        await db["emergencies"].create_index(
            "timestamp",
            expireAfterSeconds=int(timedelta(days=90).total_seconds())
        )
        print("✅ Created TTL index on emergencies (90 days)")
        
    except Exception as error:
        print(f"⚠️  Could not create TTL index: {error}")
