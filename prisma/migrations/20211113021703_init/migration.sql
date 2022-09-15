-- AddForeignKey
ALTER TABLE "notifications" ADD FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD FOREIGN KEY ("totymId") REFERENCES "Totym"("id") ON DELETE CASCADE ON UPDATE CASCADE;
