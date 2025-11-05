import React from 'react';

type TagFieldProps = {
    category: string;
    tags: Set<string>;
    allCategory: Set<string>;
    onClickTag: (category: string, tag: string) => void;
};

export default function TagField({
    category,
    tags,
    allCategory,
    onClickTag,
}: TagFieldProps) {
    const selectCategory = category?.toUpperCase();
    const tagList = Array.from(tags);
    const categoryList = Array.from(allCategory);

    return (
        <div className="flex flex-col py-2 pl-2">
            <hr className="w-[90%]" />
            <div className="flex items-center gap-5 py-3">
                <h3 className="w-12 text-sm">Category</h3>
                <div>
                    {categoryList.map((item) => (
                        <button
                            key={item}
                            className={`category-button ${
                                item.toUpperCase() === selectCategory
                                    ? 'category-button--active'
                                    : 'category-button--default'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
            <hr className="w-[90%]" />
            <div className="flex items-center gap-5 py-3">
                <h3 className="w-12 text-sm">Tags</h3>
                <div>
                    {tagList.map((tag) => (
                        <button
                            key={tag}
                            className="tag-button"
                            onClick={() => onClickTag(selectCategory, tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <hr className="w-[90%]" />
        </div>
    );
}
