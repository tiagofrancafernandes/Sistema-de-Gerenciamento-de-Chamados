<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('app_files', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->index()->unique();
            $table->string('name')->index();
            $table->string('original_name')->index()->nullable();
            $table->string('extension')->index()->nullable();
            $table->string('size')->index()->nullable();
            $table->dateTime('expires_in')->index()->nullable(); // Temp file

            $table->string('disk')->index()->nullable();
            $table->string('path')->index();
            $table->boolean('public')->index()->nullable()->default(true);

            $table->unsignedBigInteger('uploaded_by')->index()->nullable();

            $table->json('extra_data')->nullable();

            $table->nullableMorphs('refclass', 'refclass');

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('uploaded_by')->references('id')
                ->on('users')->onDelete('set null');

            $table->index('refclass_type');
            $table->index('refclass_id');

            $table->index('created_at');
            $table->index('updated_at');
            $table->index('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_files');
    }
};
