One of our users was nice enough to document the steps they took to create a runbook to set up their Go environments in Windows, and they offered to share this information with the community. We hope this is helpful to our users!

##GO System Administration 

###1 GO SERVER   
####1.1 PREREQUISITES   
   * Java 1.7 64-bit   
   * Git for Windows   
   * OpenSSL – for SSL certs  
   * Minimum system requirements: http://www.go.cd/documentation/user/current/installation/system_requirements.html   
  
####1.2 INSTALL AND INITIAL CONFIGURATION STEPS   
   1. Download GO Server setup from http://www.go.cd/download/   
   2. Accept default destination setting but choose your own Java and browse to where 64-bit Java is installed (ex: C:\Program Files\Java\jre7).   
   3. Upon completion of install, GO server service will automatically start. Open services and stop it.   
   4. Open text editor program and place the following two lines in the document: 
      ```
      wrapper.java.additional.1=-Xms4g
      wrapper.java.additional.2=-Xmx6g
      ```   
     
     * Note: Xms4g specifies that the minimum memory allocated to Java is 4GBs. 
     * Xmx6g specifies that the maximum memory allocated to Java is 6GBs.     
   5. Save the file as wrapper-properties.conf in the GO Server config folder. 
     * (ex: C:\Program Files (x86)\Go Server\config)   
   6. Install custom plugins by copying "*.jar" files to plugins\external folder 
     * (ex: C:\Program Files (x86)\Go Server\plugins\external)   
   7. Grant modify rights to Domain\GoServerSrvcAccount for the GO server install 
     * (ex: C\Program Files (x86)\GO Server)  
   8. Open Services and change the Log On account to Domain\GoServerSrvcAccount.   
   9. Run Git Credential Manager for Windows installer.   
      * Download can be found here: https://github.com/Microsoft/Git-Credential-Manager-for-Windows/releases/download/v0.9-beta.2/Setup.exe  
   10. Add Java home to system path variable. (ex: C:\Program Files\Java\jre7\bin).
      * This will make the keytool commands outlined later run.  
    
####1.3 GIT CREDENTIAL MANAGER FOR WINDOWS SETUP   
    * Note: The GoAgent and the GoServer BOTH have to be configured to use Git Credential Manager for Windows.   
   1. RDP into GO Server box as Domain\GoServerSrvcAccount.   
   2. Open Control Panel > User Accounts > Credential Manager.   
   3. Add the following to Windows Credential Store- ex: git://https://bitbucket.org, username and password   
   4. Open Git Bash window and type git clone *URL* where *URL* is the path to the repo (ex: git clone https://bitbucket.org/somerepo.git)   
   5. Clone should start. No prompt for username or password should occur.   
   6. Log out of RDP session.   

####1.4 FINAL SETUP STEPS   
   1. Start the GO Server service. 
     * Note: If the services fails to start, review go-serverwrapper.txt found in C:\Program Files (x86)\Go Server    
   2. Verify GO Server is online by opening web browser on the server and browse to http://localhost:8153/go   
   3. Navigate to Admin menu and specify the site and secure site URL (ex: https://localmachinename:8154/go)   
   4. Create default.htm page that redirects to https://localmachinename:8154/go   
     
####1.5 UPGRADE STEPS 
    * Important note: If you upgrade the GO Server to a new version, the GO Agents needs to be updated to new version as well.    
   1. Login as administration to GO portal and select Backup from Admin menu.   
   2. Click the Perform Backup button. 
     * Backup folder with today’s date will be created in C:\Program Files (x86)\Go Server\artifacts\serverBackups.   
     * Copy folder to safe location.     
   3. Download the new version from http://www.go.cd/download/   
   4. Run installer. Click yes on prompt asking if you want to continue with the upgrade.   
   5. Click through installer.   
   6. Wait a few minutes then verify GO Server is online by opening web browser on the server and browse to http://localhost:8153/go.   
   7. Scroll all the way to the bottom of the page and verify the Go Version matches the version installed.   

####1.6 SSL CERT STEPS   
   1. Work with IT department to get .pfx certificate created. 
      * (Or create your own. If you create your own, make sure that you make the private key exportable). 
      * Whatever names may be associated to the server, should be listed in the alternate names field (ex: machine name, go, go.domain.org)   
   2. RDP into GO server and copy .pfx certificate to local folder.   
   3. Open an administrator command prompt and type the following command (if your certificate is named Go.domain.org.pfx. IMPORTANT- private key password and keystore password must be serverKeystorepa55w0rd): 
      *  `keytool -importkeystore - srckeystore Go.domain.org.pfx -destkeystore keystore -srcstoretype pkcs12 - deststoretype jks -srcstorepass serverKeystorepa55w0rd -deststorepass serverKeystorepa55w0rd -v`  
   4. The previous command imports the certificate and private key into the java keystore named keystore.   
   5. Stop the GO Server service   
   6. Navigate to C:\Program Files (x86)\Go Server\config   
   7. Rename keystore to keystore.backup   
   8. Copy the keystore from step 3 to C:\Program Files (x86)\Go Server\config   
   9. Start Go Server service and verify HTTPS access by going to https://localhost:8154.  
   
###2 GO AGENT 
####2.1 PREREQUISITES 
   * GO Server 
   * Git for Windows 
   * Java 1.7 64-bit 
   * Minimum system requirements: http://www.go.cd/documentation/user/current/installation/system_requirements.html 
    
####2.2 INSTALL AND INITIAL CONFIGURATION STEPS 
   1. Download GO agent setup from http://www.go.cd/download/ 
   2. Choose destination setting then choose your own Java and browse to where 64-bit Java is installed (ex: C:\Program Files\Java\jre7). 
   3. Upon completion of install, GO Agent service will automatically start. Open Services and stop it. 
   4. Grant modify rights to Domain\GoAgentSrvcAccount where GO Agent was installed (ex: K:\Go Agent) 
   5. Open Services and change the Log On account to Domain\GoServerSrvcAccount. 
   
####2.3 GIT CREDENTIAL MANAGER FOR WINDOWS SETUP 
    * Note: The GoAgent and the GoServer BOTH have to be configured to use Git Credential Manager for Windows. 
   1. RDP into GO Server box as Domain\GoAgentSrvcAccount account. 
   2. Open Control Panel > User Accounts > Credential Manager. 
   3. Add the following to Windows Credential Store- ex: git://https://bitbucket.org, username and password 
   4. Open Git Bash window and type git clone *URL* where *URL* is the path to the repo (ex: git clone https://bitbucket.org/somerepo.git) 
   5. Clone should start. No prompt for username or password should occur. 
   6. Log out of RDP session. 
   
####2.4 FINAL SETUP STEPS 
   1. Install and configure the applications needed. 
     * Example: Visual Studio 2015 Enterprise. 
   2. Copy any custom scripts or tools folders to the root drive. Grant Domain\GoAgentSrvcAccount write permissions custom folders. 
   3. Start the GO Agent service. 
     * Note: If the services fails to start, review go-serverwrapper.txt found in C:\Program Files (x86)\Go Server 

####2.5 SSL CERT STEPS 
   1. RDP into GO agent and down corporate root .pfx certificate to local folder. 
   2. Navigate to Java install location (ex: C:\Program Files\Java\jre7\lib\security) and copy cacerts file. 
   3. Run the following command assuming you named the cert companycorp.cer in Step 1: `keytool -import -trustcacerts -alias CompanyCorporateRootCA -file companycorp.cer - keystore cacerts` 
   4. Verify cert imported by running following command: `keytool –list –v –keystore cacerts>cacerts.txt` 
   5. Search the resulting .txt for CompanyCorporate cert. If found, import succeeded. 
   6. This cacerts file can be copied to all other GO agent build boxes. Copy should be placed into source control as well. 
  
####2.6 UPGRADE STEPS 
   1. Login as administration to GO portal and select Backup from Admin menu. 
   2. Click the Perform Backup button. Backup folder with today’s date will be created in C:\Program Files (x86)\Go Server\artifacts\serverBackups. 
     * Copy folder to safe location. 
   3. Download the new version from http://www.go.cd/download/ 
   4. Run installer. Click yes on prompt asking if you want to continue with the upgrade. 
   5. Click through installer. 
   6. Wait a few minutes then verify GO Server is online by opening web browser on the server and browse to http://localhost:8153/go. 
   7. Scroll all the way to the bottom of the page and verify the Go Version matches the version installed.

####2.7 REFERENCES 
   * ThoughtWorks documentation 
     * http://www.go.cd/2014/06/05/using-go-cd-with-custom-certificates.html 
     * http://www.go.cd/documentation/user/current/advanced_usage/admin_install_multiple_agents.html

###3 POSTGRES DB SERVER 
####3.1 PREREQUISITES 
   * GO Server 
   * Minimum system requirements: http://www.postgresql.org/message-id/A1CAC7DD8FA84B0BB16F0636EA957D41@gab
   * Postgres client 
   * Ruby – for New Relic PostgreSQL plugin 
   * NSSM – for New Relic PostgreSQL plugin 
    
####3.2 INSTALL AND INITIAL CONFIGURATION STEPS 
   1. Install Postgres. Make sure to save super user password somewhere secure. 
   2. Add C:\Program Files\PostgreSQL\9.3\bin added to path 
   
####3.3 MIGRATE EXISTING GO DATABASE TO POSTGRESQL 
   1. Create new database via pgAdmin III by right clicking on Database and selecting New Database.
   2. Provide name of the database and make postgres owner 
   3. modify pg_hba.conf file to include details about GO server connecting to postgres 
     * ex:(host cruise postgres 10.2.1.2/32 md5) 
     * Complete the next steps on the GO server 
   4. Install Postgress client 
     * (recommended: pgIII - http://www.pgadmin.org/download/windows.php) 
   5. Add client to path 
     * (ex: C:\Program Files (x86)\pgAdmin III\1.20) 
   6. Create backup of database and system. 
   7. Stop GO Server service. 
   8. Create migration folder 
     * (ex: C:\migration) 
   9. Copy cruise.h2.db from backup location to migration folder 
     * (ex: C:\migration) 
   10. Copy GO postgres plugin into migration folder 
     * (current version: go-postgresql-15.2.0- 978.jar) 
   11. Create subfolder called conf under migration folder 
     * (ex: C:\migration\config) 
   12. Create file titled "postgresqldb.properties". 
     * In this file, place connection details. 
     * Example configuration follows: 
      ```
      db.host=hostname   
      db.port=5432   
      db.name=cruise   
      db.user=postgres   
      db.password=[retracted]  
      ```
   13. Navigate to the migration folder and execute the following from administrator command prompt: java -jar go-postgresql-VERSION.jar
     * (ex: java -jar go-postgresql-15.2.0-978.jar) 
   14. If this succeeded, you will the following message in the command window: Migration finished successfully 
     * Complete the next step on the PostgreSQL server 
   15. Verify data was imported into system by opening SQL Editor and run following query: `select * from pipelines`. 
     * Data should return 
     * Complete the next steps on the GO server 
   16. If query from the previous step returned data, copy the postgres.properties from the migration folder to the \Go Server\config folder 
     * (ex: C:\Program Files (x86)\Go Server\config) 
   17. Create an addons folder and copy the .jar file from step 13 into this new folder 
     * (ex: C:\Program Files (x86)\Go Server\addons) 
   18. Add an overproperty by adding the following line to wrapper-properties.conf file: `wrapper.java.additional.16=- Dgo.database.provider=com.thoughtworks.go.postgresql.PostgresqlDatabase` 
   19. Start GO Server service. 
     * Look into the go-server.log and verify [DB] 
     * Using connection configuration jdbc:postgresql is found. 

####3.4 INSTALL/CONFIGURE POSTGRESQL NEWRELIC PLUGIN 
   1. Install Ruby for Windows. 
   2. Install this gem: gem install newrelic_postgres_plugin. 
   3. Install this gem: gem install bundler. 
   4. Create install directory (ex: C:\NewRelicPlugins\Postgres). 
   5. Navigate to install directory and run this command: `pg_monitor install -l LICENSE_KEY` (replace LICENSE_KEY with your key value) 
   6. Edit the config/newrelic_plugin.yml file generated by adding in your database configuration options. 
     * Make host 127.0.0.1 
    * Add the following line after license_key: `endpoint: 'http://platform-api.newrelic.com'` 
   7. In postgresql.conf file (found under PostgreSQL\9.3\data), uncomment shared_preload_libraries and enter pg_stat_statements between '' 
   8. Restart PostgreSQL server. (Restart is required to enable pg_stat_statement shared library) 
   
####3.5 CONFIGURE POSTGRESQL NEWRELIC PLUGIN AS WINDOWS SERVICE 
   1. Download and unzip nssm (ex: C:\NSSM) 
   2. Add path to environment variables 
   3. Open admin command prompt and type nssm install “serviceName” where serviceName is the name of the service 
     * (ex: “PostgreSQL Plugin Monitor”) 
   4. In the pop-up window, specify C:\Ruby22-x64\bin\pg_monitor.bat as the application, C:\NewRelicPlugins\Postgres as the location to start in, run as an argument and put the serviceName as the display name and description. 
   5. Click install. Should say successfully created. 
   6. Start newly created service. 
  
####3.6 UPGRADE STEPS 
   1. Stop GO Server service 
   2. Perform Backup 
   3. Download new version of postgresql.VERSION.jar 
   4. Archive/remove old postgresql.VERSION.jar and place new .jar 
   5. Upgrade GO server. Perform any manual steps. 

####3.7 REFERENCES 
  * ThoughtWorks Documentation - https://www.thoughtworks.com/go/help/addon_postgres/#configuration
