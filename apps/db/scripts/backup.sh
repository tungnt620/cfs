# Database name
db_name=cfs

# Backup storage directory
backupfolder=~/backups

# Number of days to store the backup
keep_day=30

backupfile=$backupfolder/cfs-$(date +%d-%m-%Y_%H-%M-%S).backup

#create backup folder
mkdir -p $backupfolder

# Create a backup
if pg_dump -F c -b -v -f $backupfile $db_name; then
   echo 'Sql dump created'
else
   echo 'pg_dump return non-zero code'
   exit
fi

echo $backupfile

# Delete old backups
find $backupfolder -mtime +$keep_day -delete

# Example restore db
# sudo - postgres
# pg_restore -h localhost -p 5432 -U postgres -d cfs -v "~/backups/file.backup"
