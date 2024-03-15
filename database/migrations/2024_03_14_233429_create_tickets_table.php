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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('title')->index();
            $table->longText('content')->nullable();
            $table->unsignedBigInteger('agent_id')->index()->nullable();
            $table->unsignedBigInteger('customer_id')->index()->nullable();
            $table->unsignedBigInteger('category_id')->index()->nullable();
            $table->unsignedBigInteger('created_by')->index();
            $table->unsignedBigInteger('opened_to')->index()->nullable();
            $table->integer('status')->index()->nullable();
            $table->json('extra_data')->nullable();

            $table->timestamps();
            $table->softDeletes();

            $table->foreign('customer_id')
                ->references('id')
                ->on('customers');

            $table->foreign('category_id')
                ->references('id')
                ->on('categories')->onDelete('set null');

            $table->foreign('created_by')
                ->references('id')
                ->on('users');

            $table->foreign('opened_to')
                ->references('id')
                ->on('users');

            $table->foreign('agent_id')
                ->references('id')
                ->on('users');

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
        Schema::dropIfExists('tickets');
    }
};
