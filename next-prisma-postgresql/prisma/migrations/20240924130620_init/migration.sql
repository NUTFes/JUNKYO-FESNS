-- CreateTable
CREATE TABLE "dtb_areas" (
    "area_id" SMALLINT NOT NULL,
    "area_name" TEXT NOT NULL,
    "area_coordinate" TEXT NOT NULL,

    CONSTRAINT "dtb_areas_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "dtb_posts" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "area_id" SMALLINT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dtb_posts_pkey" PRIMARY KEY ("id")
);
